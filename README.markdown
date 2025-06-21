# BinanceLens

BinanceLens is a cryptocurrency trading and watchlist platform that integrates real-time market data from the Binance API. It allows users to track their favorite cryptocurrencies, set alerts, and manage a watchlist for better trading insights. Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), it ensures a seamless and efficient user experience.

![BinanceLens Screenshot](image1.png)

## Features
- **Real-time Market Data**: Fetch live cryptocurrency prices using the Binance API.
- **Secure Authentication**: User login and registration with JWT (JSON Web Tokens).
- **Watchlist Management**: Add or remove cryptocurrencies from a personalized watchlist.
- **Responsive Design**: Modern, mobile-friendly UI styled with Tailwind CSS.
- **Global State Management**: Efficient state handling using React Context API.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **API Integration**: Binance API
- **Other Tools**: Axios, bcryptjs, cors, dotenv

## Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (local or cloud, e.g., MongoDB Atlas)
- **Binance API Key** (obtain from [Binance](https://www.binance.com/))
- **Git**

## Setup & Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/binancelens.git
   cd binancelens
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     BINANCE_API_KEY=your_binance_api_key
     PORT=5000
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

3. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   - The frontend will run at `http://localhost:3000`.

4. **Access the Application**:
   - Open your browser and navigate to `http://localhost:3000`.

## Project Structure
```plaintext
BinanceLens/
├── backend/
│   ├── config/
│   │   └── db.js                    # Database connection setup
│   ├── controllers/
│   │   ├── authController.js        # User authentication logic
│   │   ├── watchlistController.js   # Watchlist operations logic
│   ├── models/
│   │   ├── User.js                  # User MongoDB schema
│   │   ├── Watchlist.js             # Watchlist MongoDB schema
│   ├── routes/
│   │   ├── authRoutes.js            # Authentication routes
│   │   ├── watchlistRoutes.js       # Watchlist routes
│   ├── server.js                    # Main backend server
│   ├── .env                         # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Watchlist.jsx        # Watchlist UI component
│   │   │   ├── Navbar.jsx           # Navigation bar component
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   ├── context/
│   │   │   ├── AuthContext.jsx      # Authentication state management
│   │   ├── services/
│   │   │   ├── authService.js       # Authentication API calls
│   │   │   ├── watchlistService.js  # Watchlist API calls
│   │   ├── App.jsx                  # Main React app
│   │   ├── index.jsx                # React app entry point
├── package.json                     # Backend dependencies
├── .gitignore                       # Git ignore file
```

## Backend Code Examples
### server.js
```javascript
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/trades', require('./routes/tradeRoutes'));
app.use('/api/watchlist', require('./routes/watchlistRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### authController.js
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
```

## Frontend Code Example
### Login.jsx
```jsx
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const userData = await loginUser(credentials);
      localStorage.setItem('user', JSON.stringify(userData.user));
      localStorage.setItem('token', userData.token);
      setUser(userData.user);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type='email' placeholder='Email' onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} />
      <input type='password' placeholder='Password' onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
```

## Binance Watchlist Implementation
### Overview
The watchlist feature allows users to track their favorite cryptocurrencies in real-time using the Binance API.

### Fetching Live Data from Binance API
**API Endpoint**:
```
GET https://api.binance.com/api/v3/ticker/price
```
**Example Response**:
```json
{
  "symbol": "BTCUSDT",
  "price": "61840.23"
}
```
**JavaScript Example**:
```javascript
const axios = require("axios");

async function getCryptoPrice(symbol) {
    try {
        const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getCryptoPrice("BTCUSDT").then(data => console.log(data));
```

### Storing Watchlist in MongoDB
**Watchlist Schema (Watchlist.js)**:
```javascript
const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbols: [{ type: String, required: true }]
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
```

### Watchlist API Routes (watchlistRoutes.js)
```javascript
const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");
const authMiddleware = require("../middleware/authMiddleware");

// Get user watchlist
router.get("/", authMiddleware, async (req, res) => {
    try {
        const watchlist = await Watchlist.findOne({ userId: req.user.id });
        res.json(watchlist ? watchlist.symbols : []);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Add to watchlist
router.post("/add", authMiddleware, async (req, res) => {
    const { symbol } = req.body;
    try {
        let watchlist = await Watchlist.findOne({ userId: req.user.id });
        if (!watchlist) {
            watchlist = new Watchlist({ userId: req.user.id, symbols: [symbol] });
        } else {
            if (!watchlist.symbols.includes(symbol)) {
                watchlist.symbols.push(symbol);
            }
        }
        await watchlist.save();
        res.json({ message: "Added to watchlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Remove from watchlist
router.post("/remove", authMiddleware, async (req, res) => {
    const { symbol } = req.body;
    try {
        const watchlist = await Watchlist.findOne({ userId: req.user.id });
        if (watchlist) {
            watchlist.symbols = watchlist.symbols.filter(item => item !== symbol);
            await watchlist.save();
        }
        res.json({ message: "Removed from watchlist" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
```

### Frontend Watchlist UI (Watchlist.jsx)
```jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/watchlist", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWatchlist(response.data);
        } catch (error) {
            console.error("Error fetching watchlist:", error);
        }
    };

    const removeFromWatchlist = async (symbol) => {
        try {
            await axios.post("http://localhost:5000/api/watchlist/remove", { symbol }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchWatchlist();
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    return (
        <div>
            <h2>My Watchlist</h2>
            <ul>
                {watchlist.map(symbol => (
                    <li key={symbol}>
                        {symbol} <button onClick={() => removeFromWatchlist(symbol)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Watchlist;
```

## Usage
1. **Register/Login**: Create an account or log in using the provided interface.
2. **Add to Watchlist**: Add cryptocurrencies (e.g., BTCUSDT, ETHUSDT) for real-time tracking.
3. **Remove from Watchlist**: Remove cryptocurrencies as needed.
4. **View Real-time Data**: Monitor live price updates from the Binance API.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a Pull Request.

## License
This project is licensed under the [MIT License](LICENSE).

## Screenshots
- **Home Page**: [image2.png](image2.png)
- **Login Page**: [image3.png](image3.png)
- **Watchlist View**: [image4.png](image4.png)
- **Dashboard**: [image5.png](image5.png)

## Acknowledgments
- [MERN Stack](https://www.mongodb.com/mern-stack) for a robust framework
- [Binance API](https://www.binance.com/en/docs/exchange-api) for real-time market data
- [Tailwind CSS](https://tailwindcss.com/) for modern, responsive styling

---
**Contact**: For issues or inquiries, please open an issue on GitHub or reach out to the maintainers.