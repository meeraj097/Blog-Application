import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogForm = () => {
  const [formData, setFormData] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`)
        .then(res => res.json())
        .then(data => setFormData({ title: data.title, content: data.content }));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = id ? 'PUT' : 'POST';
    const url = id
      ? `https://blog-application-gzkv.onrender.com/api/blogs/${id}/`
      : `https://blog-application-gzkv.onrender.com/api/blogs/`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => navigate('/admin'))
      .catch(err => console.error('Error:', err));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', width: '100%', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2 style={{ textAlign: 'center' }}>{id ? 'Edit Blog' : 'Create Blog'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem' }}
        />
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="6"
          style={{ width: '100%', padding: '0.6rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%', padding: '0.6rem', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px' }}>
          {id ? 'Update' : 'Post'}
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
