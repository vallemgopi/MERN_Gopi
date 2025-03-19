import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
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
    <motion.div
      className="watchlist-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Your Watchlist
      </motion.h2>

      {watchlist.length === 0 ? (
        <motion.p
          className="empty-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Your watchlist is empty. Add coins from the Home page!
        </motion.p>
      ) : (
        <motion.div
          className="table-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <table className="watchlist-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price (USDT)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {watchlist.map((symbol, index) => (
                <motion.tr
                  key={symbol}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <td>{symbol}</td>
                  <td>{prices[symbol] ? `$${prices[symbol].toFixed(2)}` : "Loading..."}</td>
                  <td>
                    <motion.button
                      className="remove-watchlist-btn"
                      onClick={() => handleRemoveFromWatchlist(symbol)}
                      whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(220, 53, 69, 0.8)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash /> Remove
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Watchlist;