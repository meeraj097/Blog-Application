import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // If this exists, we're editing
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (id && accessToken) {
      fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(res => res.json())
        .then(data => setFormData({ title: data.title, content: data.content }))
        .catch(err => console.error("Failed to fetch blog:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!accessToken) {
      alert("Unauthorized: Please log in first.");
      setLoading(false);
      return;
    }

    const url = id
      ? `https://blog-application-gzkv.onrender.com/api/blogs/${id}/`
      : 'https://blog-application-gzkv.onrender.com/api/blogs/';
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(id ? "Blog updated successfully!" : "Blog posted successfully!");
        navigate('/admin');
      } else {
        console.error("Error response:", data);
        alert(`Error: ${res.status} - ${data.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert("Network error.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
      <h2>{id ? "Edit Blog" : "Create New Blog"}</h2>
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
        {loading ? (id ? "Updating..." : "Posting...") : (id ? "Update Blog" : "Post Blog")}
      </button>
    </form>
  );
};

export default BlogForm;
