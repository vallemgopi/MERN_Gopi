import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import "./Home.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const coinNames = {
  BTC: { name: "Bitcoin", logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032" },
  ETH: { name: "Ethereum", logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" },
  SOL: { name: "Solana", logo: "https://cryptologos.cc/logos/solana-sol-logo.svg?v=032" },
  ADA: { name: "Cardano", logo: "https://cryptologos.cc/logos/cardano-ada-logo.svg?v=032" },
  DOGE: { name: "Dogecoin", logo: "https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=032" },
  SHIB: { name: "Shiba Inu", logo: "https://cryptologos.cc/logos/shiba-inu-shib-logo.svg?v=032" },
  MATIC: { name: "Polygon", logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=032" },
  AVAX: { name: "Avalanche", logo: "https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=032" },
  BNB: { name: "Binance Coin", logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=032" },
  XRP: { name: "Ripple", logo: "https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=032" },
  NEO: { name: "NEO", logo: "https://cryptologos.cc/logos/neo-neo-logo.svg?v=032" },
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [watchlist, setWatchlist] = useState(JSON.parse(localStorage.getItem("watchlist")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredPrices = data
        .filter((item) => item.s.endsWith("USDT"))
        .slice(0, 10)
        .reduce((acc, item) => {
          acc[item.s] = parseFloat(item.c);
          return acc;
        }, {});
      setPrevPrices(prices);
      setPrices(filteredPrices);
    };
    return () => socket.close();
  }, [prices]);

  useEffect(() => {
    if (selectedCoin) {
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`)
        .then((res) => res.json())
        .then((data) => setCoinDetails(data));
      fetch(`https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=1d&limit=30`)
        .then((res) => res.json())
        .then((data) => {
          const prices = data.map((item) => parseFloat(item[4]));
          const labels = data.map((_, index) => `Day ${index + 1}`);
          setHistoricalData({ labels, prices });
        });
    }
  }, [selectedCoin]);

  const handleAddToWatchlist = (symbol) => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
      alert(`${symbol} added to watchlist!`);
    } else {
      alert(`${symbol} is already in your watchlist.`);
    }
  };

  const handleWatchlistClick = () => navigate("/watchlist");
  const handleSearch = () => {
    const symbol = searchTerm.toUpperCase() + "USDT";
    if (prices[symbol]) setSelectedCoin(symbol);
    else alert("Coin not found in top 10 USDT pairs.");
  };
  const handleCoinClick = (symbol) => setSelectedCoin(symbol);
  const handleProceedToLogin = () => setShowAnimation(false);

  const lineData = historicalData.labels
    ? {
        labels: historicalData.labels,
        datasets: [
          {
            label: "Price (USDT)",
            data: historicalData.prices,
            fill: true,
            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, "rgba(75, 192, 192, 0.4)");
              gradient.addColorStop(1, "rgba(75, 192, 192, 0)");
              return gradient;
            },
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(75, 192, 192, 1)",
            tension: 0.4,
          },
        ],
      }
    : {};

  return (
    <div className="home-container">
      {user ? (
        <div className="post-login-content">
          <h2 className="fade-in">
            Welcome to <span className="brand">BinanceLens</span>
          </h2>
          <p className="user-info fade-in">Logged in as: {user.name}</p>

          <button className="pulse-btn fade-in" onClick={handleWatchlistClick}>
            <FaStar className="pulse-icon" /> Go to Watchlist
          </button>

          <div className="search-container fade-in">
            <input
              type="text"
              placeholder="Search coin (e.g., BTC)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">
              Search
            </button>
          </div>

          {coinDetails && (
            <div className="coin-details fade-in">
              <h3>
                <img
                  src={coinNames[selectedCoin.replace("USDT", "")]?.logo}
                  alt={`${selectedCoin.replace("USDT", "")} logo`}
                  className="coin-logo"
                />
                {selectedCoin.replace("USDT", "")} -{" "}
                {coinNames[selectedCoin.replace("USDT", "")]?.name || "Unknown"}
              </h3>
              <p>Price: ${parseFloat(coinDetails.lastPrice).toFixed(2)}</p>
              <p>24h Change: {parseFloat(coinDetails.priceChangePercent).toFixed(2)}%</p>
              <p>24h Volume: {parseFloat(coinDetails.volume).toFixed(2)}</p>
              {historicalData.labels && (
                <div className="line-chart fade-in">
                  <h4>Price History (Last 30 Days)</h4>
                  <Line
                    data={lineData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" }, tooltip: { backgroundColor: "rgba(0, 0, 0, 0.8)", titleColor: "#fff", bodyColor: "#fff" } },
                      scales: { x: { grid: { display: false } }, y: { grid: { borderDash: [5, 5] } } },
                      animation: { duration: 2000, easing: "easeInOutQuart" },
                      elements: { point: { radius: 5, hoverRadius: 8, hoverBorderWidth: 3 } },
                    }}
                  />
                </div>
              )}
            </div>
          )}

          <h3 className="market-header fade-in">Live Market Prices</h3>
          <div className="price-cards">
            {Object.entries(prices).map(([symbol, price], index) => {
              const baseAsset = symbol.replace("USDT", "");
              const prevPrice = prevPrices[symbol] || price;
              const priceChange = price > prevPrice ? "up" : price < prevPrice ? "down" : "same";
              return (
                <div
                  key={symbol}
                  className={`price-card flip-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleCoinClick(symbol)}
                >
                  <img src={coinNames[baseAsset]?.logo} alt={`${baseAsset} logo`} className="coin-logo" />
                  <h4>{baseAsset} - {coinNames[baseAsset]?.name || "Unknown"}</h4>
                  <p className={`price ${priceChange}`}>${price.toFixed(2)}</p>
                  <button
                    className="add-watchlist-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToWatchlist(symbol);
                    }}
                  >
                    <FaStar /> Add to Watchlist
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          {showAnimation ? (
            <div className="pre-login-animation">
              <div className="logo-container">
                <h1 className="brand-logo">BinanceLens</h1>
                <p className="tagline">Your Gateway to Crypto Insights</p>
                <button className="proceed-btn" onClick={handleProceedToLogin}>
                  Proceed to Login
                </button>
              </div>
              <div className="crypto-orbits">
                <div className="orbit orbit-1">
                  <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=032" alt="BTC" className="crypto-icon" />
                </div>
                <div className="orbit orbit-2">
                  <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=032" alt="ETH" className="crypto-icon" />
                </div>
                <div className="orbit orbit-3">
                  <img src="https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=032" alt="BNB" className="crypto-icon" />
                </div>
                <div className="orbit orbit-4">
                  <img src="https://cryptologos.cc/logos/solana-sol-logo.svg?v=032" alt="SOL" className="crypto-icon" />
                </div>
                <div className="orbit orbit-5">
                  <img src="https://cryptologos.cc/logos/cardano-ada-logo.svg?v=032" alt="ADA" className="crypto-icon" />
                </div>
              </div>
              <div className="wave-background">
                <div className="wave"></div>
                <div className="wave wave-2"></div>
                <div className="wave wave-3"></div>
              </div>
            </div>
          ) : (
            <>
              <h2 className="fade-in">
                Welcome to <span className="brand">BinanceLens</span>
              </h2>
              <p className="login-message slide-in">Please login to access your dashboard.</p>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;