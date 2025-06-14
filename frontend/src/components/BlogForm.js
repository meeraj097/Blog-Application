import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });
  const accessToken = localStorage.getItem("access");

  useEffect(() => {
    if (id) {
      fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`)
        .then(res => res.json())
        .then(data => setFormData({ title: data.title, content: data.content }))
        .catch(() => alert("Failed to fetch blog details"));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST";
    const url = id
      ? `https://blog-application-gzkv.onrender.com/api/blogs/${id}/`
      : "https://blog-application-gzkv.onrender.com/api/blogs/";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => {
        alert(id ? "Blog updated!" : "Blog created!");
        navigate("/admin");
      })
      .catch(() => alert("Failed to submit blog"));
  };

  return (
    <div>
      <h2>{id ? "Edit Blog" : "Create Blog"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Blog Title"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Blog Content"
          rows={5}
          required
        />
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default BlogForm;
