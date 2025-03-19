import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./DemoTrading.css";

const DemoTrading = () => {
  const [demoBalance, setDemoBalance] = useState(
    JSON.parse(localStorage.getItem("demoBalance")) || 10000
  );
  const [tradeAmount, setTradeAmount] = useState("");
  const [tradeHistory, setTradeHistory] = useState(
    JSON.parse(localStorage.getItem("tradeHistory")) || []
  );
  const [portfolio, setPortfolio] = useState(
    JSON.parse(localStorage.getItem("portfolio")) || {}
  );
  const [prices, setPrices] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(null);

  useEffect(() => {
    localStorage.setItem("demoBalance", JSON.stringify(demoBalance));
    localStorage.setItem("tradeHistory", JSON.stringify(tradeHistory));
    localStorage.setItem("portfolio", JSON.stringify(portfolio));
  }, [demoBalance, tradeHistory, portfolio]);

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

  const handleBuy = () => {
    if (!selectedCoin || !tradeAmount || tradeAmount <= 0) {
      alert("Please select a coin and enter a valid amount.");
      return;
    }
    const cost = tradeAmount * prices[selectedCoin];
    if (cost > demoBalance) {
      alert("Insufficient demo balance!");
      return;
    }
    const baseAsset = selectedCoin.replace("USDT", "");
    const newPortfolio = { ...portfolio };
    newPortfolio[baseAsset] = (newPortfolio[baseAsset] || 0) + parseFloat(tradeAmount);
    setPortfolio(newPortfolio);
    setDemoBalance(demoBalance - cost);
    setTradeHistory([
      ...tradeHistory,
      { type: "BUY", symbol: selectedCoin, amount: tradeAmount, price: prices[selectedCoin], timestamp: new Date().toLocaleString() },
    ]);
    setTradeAmount("");
    alert(`Bought ${tradeAmount} ${baseAsset} at $${prices[selectedCoin]}`);
  };

  const handleSell = () => {
    if (!selectedCoin || !tradeAmount || tradeAmount <= 0) {
      alert("Please select a coin and enter a valid amount.");
      return;
    }
    const baseAsset = selectedCoin.replace("USDT", "");
    if (!portfolio[baseAsset] || portfolio[baseAsset] < tradeAmount) {
      alert("Insufficient holdings to sell!");
      return;
    }
    const newPortfolio = { ...portfolio };
    newPortfolio[baseAsset] -= parseFloat(tradeAmount);
    if (newPortfolio[baseAsset] === 0) delete newPortfolio[baseAsset];
    const revenue = tradeAmount * prices[selectedCoin];
    setPortfolio(newPortfolio);
    setDemoBalance(demoBalance + revenue);
    setTradeHistory([
      ...tradeHistory,
      { type: "SELL", symbol: selectedCoin, amount: tradeAmount, price: prices[selectedCoin], timestamp: new Date().toLocaleString() },
    ]);
    setTradeAmount("");
    alert(`Sold ${tradeAmount} ${baseAsset} at $${prices[selectedCoin]}`);
  };

  const handleCoinSelect = (symbol) => setSelectedCoin(symbol);

  return (
    <motion.div
      className="demo-trading-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Demo Trading
      </motion.h1>
      <motion.p
        className="balance-display"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Balance: <span className="balance">${demoBalance.toFixed(2)} USDT</span>
      </motion.p>

      <motion.div
        className="coin-selector"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h3>Select a Coin</h3>
        <div className="coin-list">
          {Object.entries(prices).map(([symbol], index) => (
            <motion.button
              key={symbol}
              onClick={() => handleCoinSelect(symbol)}
              className={selectedCoin === symbol ? "selected" : ""}
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0, 221, 235, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              {symbol.replace("USDT", "")}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {selectedCoin && (
        <motion.div
          className="trade-panel"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <p className="selected-coin">
            {selectedCoin.replace("USDT", "")} - ${prices[selectedCoin]?.toFixed(2) || "N/A"}
          </p>
          <motion.input
            type="number"
            placeholder="Amount"
            value={tradeAmount}
            onChange={(e) => setTradeAmount(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          />
          <div className="trade-buttons">
            <motion.button
              onClick={handleBuy}
              className="trade-btn buy-btn"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(40, 167, 69, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Buy
            </motion.button>
            <motion.button
              onClick={handleSell}
              className="trade-btn sell-btn"
              whileHover={{ scale: 1.1, boxShadow: "0px 0px 20px rgba(220, 53, 69, 0.8)" }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              Sell
            </motion.button>
          </div>
        </motion.div>
      )}

      <motion.div
        className="trade-history"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      >
        <h3>Trade History</h3>
        {tradeHistory.length > 0 ? (
          <ul>
            {tradeHistory.map((trade, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {trade.type} {trade.amount} {trade.symbol.replace("USDT", "")} at $
                {trade.price} - {trade.timestamp}
              </motion.li>
            ))}
          </ul>
        ) : (
          <p>No trades yet.</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default DemoTrading;