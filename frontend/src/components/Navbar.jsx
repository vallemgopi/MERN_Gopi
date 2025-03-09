import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaStar } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="assets/logo.svg" alt="BinanceLens Logo" />
        <h2>BinanceLens</h2>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-links">
        <Link to="/" className="btn">
          <FaHome /> Home
        </Link>
        {isAuthenticated ? (
          <>
            <Link to="/watchlist" className="btn">
              <FaStar /> Watchlist
            </Link>
            <button onClick={handleLogout} className="btn logout">
              <FaSignOutAlt /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              <FaSignInAlt /> Login
            </Link>
            <Link to="/register" className="btn">
              <FaUserPlus /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;