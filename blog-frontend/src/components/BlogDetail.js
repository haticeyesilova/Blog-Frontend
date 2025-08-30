import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    api
      .get(`/posts/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <div>Yükleniyor...</div>;

  return (
    <div className="container" style={{ maxWidth: 800, margin: "20px auto" }}>
      <h1 style={{ marginBottom: 10 }}>{blog.title}</h1>
      {blog.imageUrl && (
        <img
          src={blog.imageUrl}
          alt={blog.title}
          style={{ width: "100%", marginBottom: 20 }}
        />
      )}
      <p style={{ lineHeight: 1.6, marginBottom: 10 }}>{blog.content}</p>
      <small style={{ color: "var(--muted)" }}>Yazar: {blog.author}</small>
    </div>
  );
};

export default BlogDetail;
