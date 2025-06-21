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

## Screenshots

- **Home Page**  
  ![Home Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/home.jpg)

- **Login Page**  
  ![Login Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/login.jpg)

- **Register Page**  
  ![Register Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/register.jpg)

- **Portfolio Page**  
  ![Portfolio Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/portp.jpg)

- **Trade Page**  
  ![Trade Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/trade.jpg)

- **Chart Page**  
  ![Chart Page](https://github.com/vallemgopi/MERN_Gopi/blob/main/chart.jpg)


## Acknowledgments
- [MERN Stack](https://www.mongodb.com/mern-stack) for a robust framework
- [Binance API](https://www.binance.com/en/docs/exchange-api) for real-time market data
- [Tailwind CSS](https://tailwindcss.com/) for modern, responsive styling

---
**Contact**: For issues or inquiries, please open an issue on GitHub or reach out to the maintainers.
