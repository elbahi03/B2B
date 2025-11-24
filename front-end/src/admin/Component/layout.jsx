import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logoutUser } from "../../features/Auths/authSlice";
import "../style/layout.css";

function Layout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/admin/login";
  };

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="admin-info">
          <h3>Admin : {user?.name || "Non défini"}</h3>
        </div>
        <ul className="sidebar-menu">
          <li><Link to="/admin/dashboard"> Dashboard</Link></li>
          <li><Link to="/admin/produits"> Produits</Link></li>
          <li><Link to="/admin/productcreate"> creer produit</Link></li>
          <li><Link to="/admin/productgestion"> Gestion de Produits</Link></li>
          <li><Link to="/admin/orders"> Ordres</Link></li>
          <li><Link to="/admin/checkin-bonnes"> Checkin des Bonnes</Link></li>
        </ul>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
