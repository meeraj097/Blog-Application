import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate();

  const fetchBlogs = useCallback(async (page = currentPage) => {
    setLoading(true);
    try {
      const res = await fetch(`https://blog-application-gzkv.onrender.com/api/myblogs/?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setBlogs(data.results || []);
    } catch (err) {
      alert("Error fetching blogs");
    }
    setLoading(false);
  }, [accessToken, currentPage]);

  const deleteBlog = async (id) => {
    try {
      const res = await fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        alert("Blog deleted successfully!");
        fetchBlogs();
      } else {
        alert("Failed to delete blog");
      }
    } catch (err) {
      alert("Error deleting blog");
    }
  };

  useEffect(() => {
    if (!accessToken) {
      alert("Please log in to access admin features.");
      navigate("/login");
      return;
    }

    fetchBlogs();
  }, [accessToken, currentPage, fetchBlogs, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: '20px' }}>
        <Link to="/create">
          <button style={{ marginRight: '10px', padding: '8px 16px' }}>Create New Blog</button>
        </Link>
        <button onClick={handleLogout} style={{ padding: '8px 16px' }}>Logout</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div>
          {blogs.length === 0 ? <p>No blogs found</p> : (
            blogs.map(blog => (
              <div key={blog.id} style={{
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '15px',
                marginBottom: '20px',
                textAlign: 'left'
              }}>
                <h3>{blog.title}</h3>
                {blog.content.split('\n').map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                <div style={{ marginTop: '10px' }}>
                  <Link to={`/blogs/${blog.id}`}>View</Link> |&nbsp;
                  <Link to={`/edit/${blog.id}`}>
                    <button style={{ marginLeft: '5px', marginRight: '5px' }}>Edit</button>
                  </Link>
                  <button onClick={() => deleteBlog(blog.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span style={{ margin: '0 10px' }}> Page {currentPage} </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default AdminPage;
