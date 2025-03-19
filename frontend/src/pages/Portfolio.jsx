import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Portfolio.css";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(
    JSON.parse(localStorage.getItem("portfolio")) || {}
  );
  const [prices, setPrices] = useState({});

  useEffect(() => {
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

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
      setPrices(filteredPrices);
    };
    return () => socket.close();
  }, []);

  const calculatePortfolioValue = () => {
    return Object.entries(portfolio).reduce((total, [coin, amount]) => {
      const symbol = `${coin}USDT`;
      return total + (prices[symbol] ? prices[symbol] * amount : 0);
    }, 0);
  };

  return (
    <motion.div
      className="portfolio-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Portfolio
      </motion.h1>
      <motion.p
        className="total-value-display"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Total Value: <span className="total-value">${calculatePortfolioValue().toFixed(2)} USDT</span>
      </motion.p>

      <motion.div
        className="portfolio-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {Object.entries(portfolio).length > 0 ? (
          <ul>
            {Object.entries(portfolio).map(([coin, amount], index) => (
              <motion.li
                key={coin}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(0, 255, 204, 0.5)" }}
              >
                {coin}: {amount} <span className="value">
                  (Value: ${(prices[`${coin}USDT`] * amount).toFixed(2)} USDT)
                </span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            No holdings yet. Start trading to build your portfolio!
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Portfolio;