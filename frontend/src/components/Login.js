import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://blog-application-gzkv.onrender.com/api/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      navigate('/dashboard');  // ✅ redirect after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
      <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
