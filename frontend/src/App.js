// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import Login from './components/Login';

function App() {
  const isAuthenticated = !!localStorage.getItem('access');

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    window.location.href = '/';
  };

  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>All Blogs</h1>

        {/* Show only after login */}
        {isAuthenticated ? (
          <div style={{ marginBottom: "1rem" }}>
            <Link to="/create" style={{ marginRight: "1rem" }}>+ Create Blog</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div style={{ marginBottom: "1rem" }}>
            <Link to="/login">Login</Link>
          </div>
        )}

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
