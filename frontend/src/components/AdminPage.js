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
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/create">
        <button>Create New Blog</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>
      {loading ? <p>Loading...</p> : (
        <div>
          {blogs.length === 0 ? <p>No blogs found</p> : (
            blogs.map(blog => (
              <div key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <Link to={`/blogs/${blog.id}`}>View</Link>
                <Link to={`/edit/${blog.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => deleteBlog(blog.id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      )}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span> Page {currentPage} </span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};

export default AdminPage;
