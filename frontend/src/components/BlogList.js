import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("https://blog-application-gzkv.onrender.com/api/blogs/")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.results)) {
          setBlogs(data.results);
        } else {
          console.error("Unexpected response:", data);
        }
      });
  }, []);

  const truncate = (text, maxLength = 200) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center' }}>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            style={{
              border: '1px solid #ddd',
              borderRadius: '5px',
              padding: '15px',
              marginBottom: '20px',
            }}
          >
            <h3>{blog.title}</h3>
            {/* Render a short preview */}
            {truncate(blog.content, 200)
              .split('\n')
              .map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            <Link to={`/blogs/${blog.id}`}>View More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
