import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Blog eklendi!");
      navigate("/");
    } catch (err) {
      alert(err.response.data.message || "Blog eklenemedi!");
    }
  };

  return (
    <div>
      <h2>Yeni Blog Yazısı</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="İçerik"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Ekle</button>
      </form>
    </div>
  );
};

export default AddBlog;
