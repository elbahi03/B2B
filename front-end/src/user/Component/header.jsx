import React, { use, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/Auths/authSlice";
import "./../style/header.css";
import { Outlet } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  navigator;

  const handleLogout = () => {
    dispatch(logoutUser());
    window.location.href = "/";
  };

  return (
    <>
    <header className="header">
      <h1 className="logo">
        <a href="/WholesaleHub/home">WholesaleHub</a>
      </h1>

      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav ${isOpen ? "show" : ""}`}>
        <a href="/WholesaleHub/home">Accueil</a>
        <a href="/WholesaleHub/Magasins">Les magasins</a>
        <a href="/WholesaleHub/Contact">Contact</a>
        <a href="/WholesaleHub/Apropos">A propos</a>
      </nav>
        <details className="user-menu">
          <summary>{user ? user.name : "Utilisateur"}</summary>
          <div className="user-dropdown">
          <a href="#">Votre espace</a>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </details>
    </header>
    <Outlet />
    </>
  );
}

export default Header;
