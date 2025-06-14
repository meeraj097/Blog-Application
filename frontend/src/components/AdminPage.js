import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchBlogs = () => {
    fetch('https://blog-application-gzkv.onrender.com/api/myblogs/', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error('Error:', err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>Admin Dashboard</h2>
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        <button onClick={() => navigate('/create')} style={{ padding: '0.5rem 1rem', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
          Create Blog
        </button>
      </div>
      {blogs.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No blogs available</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <Link to={`/edit/${blog.id}`} style={{ marginRight: '1rem' }}>Edit</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
