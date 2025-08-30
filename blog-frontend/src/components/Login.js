import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);

      alert("Giriş başarılı!");

      // email ve password state'lerini temizle
      setEmail("");
      setPassword("");

      // anasayfaya yönlendir
      navigate("/");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Giriş başarısız");
    }
  };

  return (
    <div className="container">
      <div className="hero">
        <span className="badge">Hesap</span>
        <h2>Giriş Yap</h2>
        <p></p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input"
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
