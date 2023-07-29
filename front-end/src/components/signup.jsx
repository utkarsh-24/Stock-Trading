import axios from 'axios';
import '../styles/Signup.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post(process.env.REACT_APP_API_URL + 'user/signup', {
        name,
        email,
        password,
      });
      if (response.data.success) {
        window.location.href = '/login';
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if(error.response.data.message.includes("password")) {
        setError("Password must be 3 to 30 characters long and contain only letters and numbers.")
      } else {
        setError(error.response.data.message);
      };
    }
  };

  return (
    <div className="signup-form-container">
            <h2>SignUp</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignup}>
                <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        type="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">confirmPassword</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">SignUp</button>
            </form>
            <div className="link">
                Already have an account? <Link to="/login" className='login-link'>Login</Link>
            </div>
        </div>
  );
};

export default Signup;
