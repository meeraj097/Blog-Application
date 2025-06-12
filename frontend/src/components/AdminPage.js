// src/components/AdminPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access');

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    setLoading(true);
    try {
      const res = await fetch(`https://blog-application-gzkv.onrender.com/api/blogs/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setBlogs(data.results || []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      alert("Error fetching blogs");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.status === 204) {
        alert("Blog deleted");
        fetchBlogs(currentPage);
      } else {
        alert("Failed to delete blog");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting blog");
    }
  };

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

      {loading ? <p>Loading blogs...</p> : (
        <>
          {blogs.length === 0 ? (
            <p>No blogs found.</p>
          ) : (
            <ul style={{ padding: 0 }}>
              {blogs.map(blog => (
                <li key={blog.id} style={{ marginBottom: "1rem", listStyle: "none" }}>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  <div>
                    <Link to={`/edit/${blog.id}`} style={{ marginRight: "1rem" }}>Edit</Link>
                    <button onClick={() => handleDelete(blog.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              style={{ marginRight: "1rem" }}
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button onClick={() => setCurrentPage(p => p + 1)} style={{ marginLeft: "1rem" }}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPage;
