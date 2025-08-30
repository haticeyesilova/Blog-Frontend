import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const BlogForm = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // Giriş kontrolü
  useEffect(() => {
    if (!token) {
      alert("Blog eklemek için giriş yapmalısınız!");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        "/blogs",
        { title, content, author, imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Blog başarıyla eklendi!");
      setTitle("");
      setContent("");
      setAuthor("");
      setImageUrl("");
      navigate("/"); // ekledikten sonra anasayfaya dön
    } catch (error) {
      console.error("Blog eklenirken hata:", error);
      alert("Blog eklenemedi");
    }
  };
  if (!token) return <div>Yönlendiriliyorsunuz...</div>;

  return (
    <div className="container">
      <div className="hero">
        <span className="badge">Yeni</span>
        <h2>Yeni Blog Yazısı</h2>
        <p>Başlığı, içeriği ve istersen bir görsel linki ekle.</p>
      </div>

      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="textarea"
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          className="input"
          type="text"
          placeholder="Yazar (token yoksa zorunlu)"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <input
          className="input"
          type="url"
          placeholder="Görsel URL (opsiyonel)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {imageUrl && (
          <img
            className="preview"
            src={imageUrl}
            alt="önizleme"
            onError={(e) => {
              e.currentTarget.src = "";
            }}
          />
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" type="submit">
            Ekle
          </button>
          <button
            className="btn ghost"
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              setAuthor("");
              setImageUrl("");
            }}
          >
            Temizle
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
