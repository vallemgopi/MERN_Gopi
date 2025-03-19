import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaStar, FaChartLine, FaWallet } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <motion.nav
      className="navbar"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src="assets/logo.svg" alt="BinanceLens Logo" />
        <h2>BinanceLens</h2>
      </motion.div>

      <div className="nav-links">
        <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
          <Link to="/" className="btn">
            <FaHome /> Home
          </Link>
        </motion.div>

        {isAuthenticated ? (
          <>
            <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
              <Link to="/demo-trading" className="btn">
                <FaChartLine /> Demo Trading
              </Link>
            </motion.div>
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <Link to="/portfolio" className="btn">
                <FaWallet /> Portfolio
              </Link>
            </motion.div>
            <motion.div custom={3} variants={itemVariants} initial="hidden" animate="visible">
              <Link to="/watchlist" className="btn">
                <FaStar /> Watchlist
              </Link>
            </motion.div>
            <motion.div custom={4} variants={itemVariants} initial="hidden" animate="visible">
              <button onClick={handleLogout} className="btn logout">
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible">
              <Link to="/login" className="btn">
                <FaSignInAlt /> Login
              </Link>
            </motion.div>
            <motion.div custom={2} variants={itemVariants} initial="hidden" animate="visible">
              <Link to="/register" className="btn">
                <FaUserPlus /> Register
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;