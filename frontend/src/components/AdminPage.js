// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://blog-application-gzkv.onrender.com/api/blogs/?format=json');

  const token = localStorage.getItem('access');

  useEffect(() => {
    fetch(currentPageUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        const adminUsername = localStorage.getItem('username') || 'admin'; // default fallback
        const adminBlogs = data.results.filter(blog => blog.author_username === adminUsername);
        setBlogs(adminBlogs);
        setNext(data.next);
        setPrevious(data.previous);
      })
      .catch(err => console.error("Error fetching blogs:", err));
  }, [currentPageUrl, token]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(res => {
          if (res.ok) {
            alert('Blog deleted.');
            setBlogs(blogs.filter(blog => blog.id !== id));
          } else {
            alert('Failed to delete.');
          }
        });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/create" style={{ marginRight: "1rem" }}>+ Create Blog</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {blogs.map(blog => (
        <div key={blog.id} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem" }}>
          <h3>{blog.title}</h3>
          <p>{blog.content.slice(0, 150)}...</p>
          <Link to={`/blogs/${blog.id}`}>View</Link>
          {' | '}
          <Link to={`/edit/${blog.id}`}>Edit</Link>
          {' | '}
          <button onClick={() => handleDelete(blog.id)} style={{ color: 'red' }}>Delete</button>
        </div>
      ))}

      <div>
        {previous && <button onClick={() => setCurrentPageUrl(previous)}>Previous</button>}
        {next && <button onClick={() => setCurrentPageUrl(next)}>Next</button>}
      </div>
    </div>
  );
};

export default AdminPage;
