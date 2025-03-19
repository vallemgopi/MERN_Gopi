const axios = require("axios");
const express = require("express");
const router = express.Router();

const BINANCE_API_URL = "https://api.binance.com/api/v3";

// Fetch Binance market prices
router.get("/prices", async (req, res) => {
    try {
        const response = await axios.get(`${BINANCE_API_URL}/ticker/price`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching Binance prices:", error);
        res.status(500).json({ error: "Error fetching Binance prices" });
    }
});

// Fetch order book for a symbol
router.get("/orderbook/:symbol", async (req, res) => {
    try {
        const { symbol } = req.params;
        const response = await axios.get(`${BINANCE_API_URL}/depth`, { params: { symbol } });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching order book:", error);
        res.status(500).json({ error: "Error fetching order book" });
    }
});
router.get("/summary", async (req, res) => {
    try {
      const response = await axios.get(`${BINANCE_API_URL}/ticker/24hr`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching market summary" });
    }
  });
  
 
  

module.exports = router;
