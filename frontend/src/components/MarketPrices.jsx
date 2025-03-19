import React, { useEffect, useState } from "react";
import { getMarketPrices } from "../services/binanceService";

const MarketPrices = () => {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const data = await getMarketPrices();
      setPrices(data);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000); // Update every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Market Prices</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price (USDT)</th>
          </tr>
        </thead>
        <tbody>
          {prices.slice(0, 10).map((price) => (
            <tr key={price.symbol}>
              <td>{price.symbol}</td>
              <td>${parseFloat(price.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketPrices;
