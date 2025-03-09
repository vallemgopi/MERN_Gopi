import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "./Home.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const coinNames = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  SOL: "Solana",
  ADA: "Cardano",
  DOGE: "Dogecoin",
  SHIB: "Shiba Inu",
  MATIC: "Polygon",
  AVAX: "Avalanche",
  BNB: "Binance Coin",
  XRP: "Ripple",
  // Add more mappings as needed
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  // Update local storage for watchlist
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // WebSocket for live prices
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

  // Fetch coin details and historical data when a coin is selected
  useEffect(() => {
    if (selectedCoin) {
      // Fetch current price and 24hr stats
      fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${selectedCoin}`)
        .then((res) => res.json())
        .then((data) => setCoinDetails(data));

      // Fetch historical data for the bar graph (last 30 days)
      fetch(
        `https://api.binance.com/api/v3/klines?symbol=${selectedCoin}&interval=1d&limit=30`
      )
        .then((res) => res.json())
        .then((data) => {
          const prices = data.map((item) => parseFloat(item[4])); // Closing price
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

  const handleWatchlistClick = () => {
    navigate("/watchlist");
  };

  const handleSearch = () => {
    const symbol = searchTerm.toUpperCase() + "USDT";
    if (prices[symbol]) {
      setSelectedCoin(symbol);
    } else {
      alert("Coin not found in top 10 USDT pairs.");
    }
  };

  // Bar graph data
  const barData = historicalData.labels
    ? {
        labels: historicalData.labels,
        datasets: [
          {
            label: "Price (USDT)",
            data: historicalData.prices,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }
    : {};

  return (
    <div className="home-container">
      <h2>
        Welcome to <span className="brand">BinanceLens</span>
      </h2>

      {user ? (
        <>
          <p className="user-info">Logged in as: {user.name}</p>

          {/* Pulsing Watchlist Button */}
          <button className="pulse-btn" onClick={handleWatchlistClick}>
            <FaStar className="pulse-icon" /> Go to Watchlist
          </button>

          {/* Search Bar */}
          <div className="search-container">
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

          {/* Coin Details */}
          {coinDetails && (
            <div className="coin-details">
              <h3>
                {selectedCoin.replace("USDT", "")} -{" "}
                {coinNames[selectedCoin.replace("USDT", "")] || "Unknown"}
              </h3>
              <p>Price: ${parseFloat(coinDetails.lastPrice).toFixed(2)}</p>
              <p>
                24h Change: {parseFloat(coinDetails.priceChangePercent).toFixed(2)}%
              </p>
              <p>24h Volume: {parseFloat(coinDetails.volume).toFixed(2)}</p>
              {historicalData.labels && (
                <div className="bar-graph">
                  <h4>Price History (Last 30 Days)</h4>
                  <Bar
                    data={barData}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: "top" } },
                    }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Live Market Prices */}
          <h3 className="market-header">Live Market Prices</h3>
          <div className="table-container">
            <table className="market-table">
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price (USDT)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(prices).map(([symbol, price]) => {
                  const baseAsset = symbol.replace("USDT", "");
                  const prevPrice = prevPrices[symbol] || price;
                  const priceChange =
                    price > prevPrice ? "up" : price < prevPrice ? "down" : "same";

                  return (
                    <tr key={symbol} className={`price-${priceChange}`}>
                      <td>
                        {baseAsset} - {coinNames[baseAsset] || "Unknown"}
                      </td>
                      <td>${price.toFixed(2)}</td>
                      <td>
                        <button
                          className="add-watchlist-btn"
                          onClick={() => handleAddToWatchlist(symbol)}
                        >
                          <FaStar /> Add to Watchlist
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p className="login-message">Please login to access your dashboard.</p>
      )}
    </div>
  );
};

export default Home;