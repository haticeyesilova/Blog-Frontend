import React, { useEffect, useState } from "react";
import api from "../api";
import "./BlogList.css";

function BlogCard({ blog, onClick }) {
  const img = blog.imageUrl || `https://picsum.photos/seed/${blog._id}/600/400`;

  return (
    <div className="card" onClick={() => onClick(blog)}>
      <img className="card-img" src={img} alt={blog.title} />
      <div className="card-body">
        <h3>{blog.title}</h3>
        <p>
          {blog.content.length > 120
            ? blog.content.slice(0, 120) + "..."
            : blog.content}
        </p>
        <small style={{ color: "var(--muted)" }}>Yazar: {blog.author}</small>
      </div>
    </div>
  );
}

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <div className="grid">
          {blogs.map((b) => (
            <BlogCard key={b._id} blog={b} onClick={setSelectedBlog} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedBlog && (
        <div className="modal-overlay" onClick={() => setSelectedBlog(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
            {selectedBlog.imageUrl && (
              <img src={selectedBlog.imageUrl} alt={selectedBlog.title} />
            )}
            <button className="btn ghost" onClick={() => setSelectedBlog(null)}>
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
