import React, { useState } from "react";
import api from "../api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register", { name, email, password });
      alert("Kayıt başarılı! Şimdi giriş yapabilirsin.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Kayıt başarısız");
    }
  };

  return (
    <div className="container">
      <div className="hero">
        <span className="badge">Hesap</span>
        <h2>Kayıt Ol</h2>
        <p>Hızlıca hesabını oluştur.</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Ad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
          Kayıt Ol
        </button>
      </form>
    </div>
  );
}
