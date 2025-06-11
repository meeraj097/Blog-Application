import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://your-render-backend-url.onrender.com"; // 🔁 Replace with actual backend URL

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${BACKEND_URL}/api/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access) {
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          alert("Login successful!");
          navigate('/blogs');
        } else {
          alert("Login failed.");
        }
      })
      .catch((err) => {
        console.error('Login error:', err);
        alert("Something went wrong. Try again.");
      });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <div>
        <label>Username:</label><br />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>Password:</label><br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }}>Login</button>
    </form>
  );
};

export default Login;
