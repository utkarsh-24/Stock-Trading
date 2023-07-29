import axios from "axios";
import "../styles/Login.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "user/login",
        { email, password }
      );
      if (response.data.success) {
        window.location.href = "/"+ "?bearer=" + response.data.token;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if(error.response.data.message.includes("password")) {
        setError("Password must be 3 to 30 characters long and contain only letters and numbers.")
      } else {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="link">
        Don't have an account?{" "}
        <Link to="/signup" className="signup-link">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
