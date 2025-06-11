// src/components/BlogList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

 useEffect(() => {
  fetch("http://127.0.0.1:8000/api/blogs/")
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data.results)) {
        setBlogs(data.results);
      } else {
        setBlogs([]); // fallback
      }
    });
}, []);


  return (
    <div>
      {blogs.length > 0 ? (
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
