import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://blog-application-gzkv.onrender.com/api/blogs/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Expected array but got:", data);
        }
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id} style={{ marginBottom: '20px' }}>
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
          <Link to={`/blogs/${blog.id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
