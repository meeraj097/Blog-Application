import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`https://blog-application-gzkv.onrender.com/api/blogs/${id}/`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h2>{blog.title}</h2>
      {blog.content.split('\n').map((para, idx) => (
        <p key={idx}>{para}</p>
      ))}
    </div>
  );
};

export default BlogDetail;
