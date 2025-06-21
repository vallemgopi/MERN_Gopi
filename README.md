# BinanceLens

A cryptocurrency trading and watchlist platform that integrates real-time market data from the Binance API. BinanceLens enables users to track favorite cryptocurrencies, set alerts, and manage watchlists for informed trading decisions. Built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js), it offers a seamless and modern user experience.

![BinanceLens Screenshot](image1.png)

## Features
- **Real-time Market Data**: Fetch live cryptocurrency prices via the Binance API.
- **Secure Authentication**: User login and registration with JWT (JSON Web Tokens).
- **Watchlist Management**: Add/remove cryptocurrencies to/from a personalized watchlist.
- **Responsive Design**: Modern, mobile-friendly UI styled with Tailwind CSS.
- **Global State Management**: Efficient state handling using React Context API.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Context API
- **Backend**: Binance API for real-time data
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Other Tools**: Axios, bcryptjs, dotenv, cors

## Prerequisites
Before setting up the project ensure you have the following installed:
- Node.js** (v16 or higher)
- MongoDB** (local or cloud, e.g., MongoDB Atlas)
- Binance API Key** (generate from [Binance](https://www.binance.com/))
- Git**

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/binancelens.git
   cd binancelens
BinanceLens/
├── backend/
│   ├── config/
│   │   └── db.js                    # Database connection setup
│   ├── controllers/
│   │   ├── authController.js           # User authentication logic
│   │   ├── watchlistController.js   # Watchlist operations logic
│   ├── models/
│   │   ├── User.js                  # User MongoDB schema
│   │   ├── Watchlist.js               # Watchlist MongoDB schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── watchlistRoutes.js      # Watchlist routes
│   ├── server.js                  # Main backend server
│   ├── .env                      # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Watchlist.js          # Watchlist UI component
│   │   │   │   ├── Navbar.jsx            # Navigation bar component
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   │   ├── Login.jsx         # Login page
│   │   │   │   ├── Register.jsx      # Registration page
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Authentication state management
│   │   ├── services/
│   │   │   ├── authService.js    # Authentication API calls
│   │   │   ├── watchlistService.js # Watchlist API calls
│   │   ├── App.jsx            # Main React app
│   │   ├── index.jsx         # React app entry point
├── package.json               # Backend dependencies
├── .gitignore             # Git ignore file
