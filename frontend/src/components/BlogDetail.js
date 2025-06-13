// src/components/BlogDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://blog-application-gzkv.onrender.com";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/blogs/${id}/`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError("Could not load blog post.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();

    const token = localStorage.getItem('access');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser(payload.username);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access')}`,
        },
      });

      if (res.status === 204) {
        alert("Blog deleted successfully.");
        navigate('/');
      } else {
        alert("Failed to delete blog.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: "1rem", maxWidth: "800px", margin: "auto" }}>
      <h2>{blog.title}</h2>
      <p style={{ fontStyle: 'italic', color: 'gray' }}>
        By {blog.author_username || 'Unknown'} on {new Date(blog.created_at).toLocaleString()}
      </p>
      <p style={{ marginTop: "1rem" }}>{blog.content}</p>

      {blog.author_username === currentUser && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: "1rem",
            padding: "0.4rem 1rem",
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Delete Blog
        </button>
      )}

      <div style={{ marginTop: "2rem" }}>
        <Link to="/" style={{ color: "#007bff" }}>← Back to Blogs</Link>
      </div>
    </div>
  );
};

export default BlogDetail;
