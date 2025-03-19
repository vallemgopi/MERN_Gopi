import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import DemoTrading from "./pages/DemoTrading"; // Import the new DemoTrading page
import Portfolio from "./pages/Portfolio";     // Import the new Portfolio page

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/demo-trading" element={<DemoTrading />} /> {/* Add Demo Trading route */}
        <Route path="/portfolio" element={<Portfolio />} />      {/* Add Portfolio route */}
      </Routes>
    </Router>
  );
}

export default App;