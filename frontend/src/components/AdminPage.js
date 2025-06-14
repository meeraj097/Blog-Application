import React, { useState } from 'react';

const Dashboard = ({ onCreate }) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    try {
      const response = await fetch('https://blog-application-gzkv.onrender.com/api/blogs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setTitle('');
        setContent('');
        onCreate(); // refresh blog list
        setShowForm(false); // hide form after post
      } else {
        alert('Failed to post blog');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, Admin</h2>

        <button onClick={() => setShowForm(!showForm)} style={styles.toggleButton}>
          {showForm ? 'Cancel' : 'Create Blog'}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Enter blog title"
              required
            />

            <label style={styles.label}>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={styles.textarea}
              placeholder="Write your blog content..."
              required
            />

            <button type="submit" style={styles.submitButton}>🚀 Post Blog</button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    backgroundColor: '#f3f4f6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '60px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: '600',
    color: '#333',
  },
  toggleButton: {
    padding: '10px 20px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    outline: 'none',
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '16px',
    minHeight: '120px',
    resize: 'vertical',
    outline: 'none',
  },
  submitButton: {
    padding: '12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default Dashboard;
