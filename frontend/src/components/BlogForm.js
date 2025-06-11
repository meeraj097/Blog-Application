// src/components/BlogForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://your-render-backend-url.onrender.com"; // 🔁 Replace this with your actual backend URL

const BlogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const accessToken = localStorage.getItem("access"); // Get JWT token

    if (!accessToken) {
      alert("Unauthorized: Please log in first.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/api/blogs/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json(); // Read response body

      if (res.ok) {
        alert("Blog posted successfully!");
        navigate('/');
      } else if (res.status === 401) {
        alert("Unauthorized: Please log in again.");
      } else {
        console.error("Error response:", data);
        alert(`Error posting blog: ${res.status} - ${data.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert("Network error.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>Create New Blog</h2>
      <div>
        <label>Title:</label><br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label>Content:</label><br />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={6}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <button type="submit" style={{ marginTop: "1rem" }} disabled={loading}>
        {loading ? "Posting..." : "Post Blog"}
      </button>
    </form>
  );
};

export default BlogForm;
