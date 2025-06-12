// src/components/AdminPage.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/create" style={{ marginRight: "1rem" }}>+ Create Blog</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminPage;
