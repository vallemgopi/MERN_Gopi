import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import custom styles

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userData = await loginUser(credentials);
      localStorage.setItem("user", JSON.stringify(userData.user));
      localStorage.setItem("token", userData.token);
      setUser(userData.user);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Left Panel - Login Form */}
      <div className="login-left">
        <div className="login-box">
          <h2>Welcome Back</h2>
          {error && <p className="alert alert-danger text-center">{error}</p>}
          
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </div>

          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Login
          </button>

          <p className="text-center mt-3">
            Don't have an account? <a href="/register" className="text-decoration-none">Sign up</a>
          </p>
        </div>
      </div>

      {/* Right Panel - Aesthetic Background */}
      <div className="login-right">
        <h1>Welcome.</h1>
        <p>Explore the world of BinanceLens.</p>
      </div>
    </div>
  );
};

export default Login;
