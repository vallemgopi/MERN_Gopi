import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./Watchlist.css";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [prices, setPrices] = useState({});

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/!ticker@arr");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const filteredPrices = data
        .filter((item) => watchlist.includes(item.s))
        .reduce((acc, item) => {
          acc[item.s] = parseFloat(item.c);
          return acc;
        }, {});

      setPrices((prev) => ({ ...prev, ...filteredPrices }));
    };

    return () => socket.close();
  }, [watchlist]);

  const handleRemoveFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((item) => item !== symbol));
    alert(`${symbol} removed from watchlist!`);
  };

  return (
    <div className="watchlist-container">
      <h2>Your Watchlist</h2>
      {watchlist.length === 0 ? (
        <p className="empty-message">Your watchlist is empty. Add coins from the Home page!</p>
      ) : (
        <div className="table-container">
          <table className="watchlist-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price (USDT)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((symbol) => (
                <tr key={symbol}>
                  <td>{symbol}</td>
                  <td>{prices[symbol] ? `$${prices[symbol].toFixed(2)}` : "Loading..."}</td>
                  <td>
                    <button
                      className="remove-watchlist-btn"
                      onClick={() => handleRemoveFromWatchlist(symbol)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Watchlist;