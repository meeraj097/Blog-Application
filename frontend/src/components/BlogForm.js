// src/components/BlogForm.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [formData, setFormData] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (isEdit) {
      fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(res => res.json())
        .then(data => setFormData({ title: data.title, content: data.content }))
        .catch(err => {
          console.error("Error fetching blog data", err);
          alert("Failed to load blog data.");
        });
    }
  }, [id, isEdit, accessToken]);

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

    try {
      const url = isEdit
        ? `https://blog-application-gzkv.onrender.com/api/blogs/${id}/`
        : `https://blog-application-gzkv.onrender.com/api/blogs/`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(`Blog ${isEdit ? 'updated' : 'created'} successfully!`);
        navigate('/admin');
      } else {
        const data = await res.json();
        alert(`Error: ${res.status} - ${data.detail || "Unknown error"}`);
      }
    } catch (err) {
      console.error('Network error:', err);
      alert("Network error.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '1rem', maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
        {isEdit ? "Edit Blog" : "Create New Blog"}
      </h2>
      <div>
        <label>Title:</label><br />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
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
          style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
        />
      </div>
      <button
        type="submit"
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px"
        }}
        disabled={loading}
      >
        {loading ? (isEdit ? "Updating..." : "Posting...") : (isEdit ? "Update Blog" : "Post Blog")}
      </button>
    </form>
  );
};

export default BlogForm;
