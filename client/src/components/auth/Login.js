import React, { useState, useContext } from 'react';
import { AuthContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser, setToken, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) throw new Error('Please fill all fields.');

      const response = await axios.post(
        'https://simple-task-management-system.onrender.com/api/auth/login',
        { email, password }
      );

      setUser(response.data.user);
      setToken(response.data.token);
      setLoggedIn(true);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="bg-white p-4 rounded shadow w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
        </form>
        <div className="text-center mt-3">
          <p className="mb-1">Don't have an account?</p>
          <a href="/register" className="text-primary text-decoration-none">Create a new account</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
