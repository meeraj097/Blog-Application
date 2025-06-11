import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [currentUser, setCurrentUser] = useState('');

  useEffect(() => {
    // Fetch blog details
    fetch(`http://127.0.0.1:8000/api/blogs/${id}/`)
      .then((res) => res.json())
      .then((data) => setBlog(data));

    // Decode JWT to get username (or fetch from /me endpoint if you have it)
    const token = localStorage.getItem('access');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCurrentUser(payload.username);
    }
  }, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    const token = localStorage.getItem('access');
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/blogs/${id}/`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.status === 204) {
        alert("Blog deleted successfully.");
        navigate('/');
      } else if (res.status === 403) {
        alert("You are not allowed to delete this blog.");
      } else {
        alert("Failed to delete blog.");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>

      {blog.author_username === currentUser && (
        <button onClick={handleDelete} style={{ marginTop: "1rem", color: 'red' }}>
          Delete Blog
        </button>
      )}
    </div>
  );
};

export default BlogDetail;
