BinanceLens
BinanceLens is a cryptocurrency trading and watchlist platform that integrates real-time market data from the Binance API. It allows users to track their favorite cryptocurrencies, set alerts, and manage a watchlist for better trading insights. The platform is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, ensuring a seamless and efficient user experience.
Features

Real-time Data: Fetch live cryptocurrency prices using the Binance API.
User Authentication: Secure login and registration with JWT.
Watchlist Management: Add or remove cryptocurrencies from a personalized watchlist.
Responsive UI: Modern and intuitive interface styled with Tailwind CSS.
State Management: Efficient global state management using React Context API.

Technologies Used

Frontend: React.js, Tailwind CSS, Context API
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JSON Web Token (JWT)
API Integration: Binance API
Dependencies: Axios, bcryptjs, cors, dotenv

Prerequisites

Node.js (v16 or higher)
MongoDB (local or cloud instance like MongoDB Atlas)
Binance API Key (obtain from Binance)
Git

Setup & Installation

Clone the Repository:
git clone https://github.com/yourusername/binancelens.git
cd binancelens


Backend Setup:
cd backend
npm install

Create a .env file in the backend directory and add the following:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
BINANCE_API_KEY=your_binance_api_key
PORT=5000

Start the backend server:
npm start


Frontend Setup:
cd frontend
npm install
npm start

The frontend will run on http://localhost:3000.

Access the Application:Open your browser and navigate to http://localhost:3000 to use BinanceLens.


Project Structure
BinanceLens/
├── backend/
│   ├── config/
│   │   └── db.js                 # Database connection
│   ├── controllers/
│   │   ├── authController.js     # User authentication logic
│   │   ├── watchlistController.js # Watchlist operations
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Watchlist.js          # Watchlist schema
│   ├── routes/
│   │   ├── authRoutes.js         # Login & registration routes
│   │   ├── watchlistRoutes.js    # Watchlist management routes
│   ├── server.js                 # Main backend server
│   ├── .env                      # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Watchlist.js      # Watchlist UI component
│   │   │   ├── Navbar.js         # Navigation bar
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # User login page
│   │   │   ├── Register.js       # User registration page
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Authentication state management
│   │   ├── services/
│   │   │   ├── authService.js    # API calls for authentication
│   │   │   ├── watchlistService.js # API calls for watchlist
│   │   ├── App.js                # Main React app
│   │   ├── index.js              # React app entry point
├── package.json                  # Backend dependencies
├── .gitignore                    # Ignored files

Usage

Register/Login: Create an account or log in using the provided interface.
Add to Watchlist: Use the watchlist feature to add cryptocurrencies (e.g., BTCUSDT, ETHUSDT) for real-time tracking.
Remove from Watchlist: Remove cryptocurrencies from your watchlist as needed.
View Real-time Data: Monitor live price updates fetched from the Binance API.

API Integration
BinanceLens uses the Binance API to fetch real-time cryptocurrency prices. Example endpoint:
GET https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT

Contributing

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes and commit (git commit -m "Add feature").
Push to the branch (git push origin feature-branch).
Create a Pull Request.

License
This project is licensed under the MIT License.
Acknowledgments

Built with the MERN stack.
Uses Binance API for real-time cryptocurrency data.
Styled with Tailwind CSS for a modern, responsive design.

