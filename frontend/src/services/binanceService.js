import axios from "axios";

const BINANCE_API_URL = "https://api.binance.com/api/v3/ticker/price";

export const getMarketPrices = async () => {
  try {
    const response = await axios.get(BINANCE_API_URL);
    console.log("Binance API Response:", response.data); // Log API response
    return response.data;
  } catch (error) {
    console.error("Error fetching market prices:", error.message);
    return [];
  }
};
