import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch blog");
        return res.json();
      })
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load blog.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author_username}</p>
    </div>
  );
};

export default BlogDetail;
