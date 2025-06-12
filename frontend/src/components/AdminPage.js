// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchBlogs = () => {
    fetch(`https://blog-application-gzkv.onrender.com/api/blogs/?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const filteredBlogs = data.results.filter(blog => blog.author_username === 'admin');
        setBlogs(filteredBlogs);
        setNextPage(data.next);
        setPrevPage(data.previous);
      });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`
      }
    }).then(() => fetchBlogs());
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  useEffect(() => {
    fetchBlogs();
  }, [page]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Admin Dashboard</h2>
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/create" style={{ marginRight: "1rem" }}>+ Create Blog</Link>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {blogs.length === 0 ? (
        <p>No blogs created by admin yet.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
            <Link to={`/blogs/${blog.id}`} style={{ marginRight: '1rem' }}>View</Link>
            <Link to={`/edit/${blog.id}`} style={{ marginRight: '1rem' }}>Edit</Link>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        ))
      )}

      <div>
        {prevPage && <button onClick={() => setPage(prev => prev - 1)}>Previous</button>}
        {nextPage && <button onClick={() => setPage(prev => prev + 1)} style={{ marginLeft: '1rem' }}>Next</button>}
      </div>
    </div>
  );
};

export default AdminPage;
