// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://blog-application-gzkv.onrender.com/api/blogs/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          setBlogs(data.results); // paginated
        } else if (Array.isArray(data)) {
          setBlogs(data); // non-paginated fallback
        } else {
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err);
        setBlogs([]);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Public Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog.id} style={{ marginBottom: "1rem" }}>
            <h3>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h3>
            <p>{blog.content.slice(0, 100)}...</p>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};

export default BlogList;
