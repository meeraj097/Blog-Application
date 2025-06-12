// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import Login from './components/Login';
import AdminPage from './components/AdminPage'; // ✅ import this

function App() {
  const isAuthenticated = !!localStorage.getItem('access');

  return (
    <Router>
      <div style={{ padding: '1rem' }}>
        <h1>All Blogs</h1>

        <div style={{ marginBottom: "1rem" }}>
          {isAuthenticated ? (
            <>
              <Link to="/admin">Admin</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPage />} /> {/* ✅ new route */}
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
