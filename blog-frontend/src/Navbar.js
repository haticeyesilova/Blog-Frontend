import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          MyBlog
        </Link>
      </div>
      <div className="navbar-right">
        {token ? (
          <>
            <Link to="/add" className="btn">
              Blog Ekle
            </Link>
            <button
              className="btn ghost"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
            >
              Çıkış Yap
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Giriş Yap
            </Link>
            <Link to="/register" className="btn ghost">
              Kaydol
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
