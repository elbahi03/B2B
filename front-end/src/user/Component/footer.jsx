import React from "react";
import "../style/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1 : Logo et description */}
        <div className="footer-section">
          <h2 className="footer-logo">WholesaleHub</h2>
          <p>Votre plateforme pour connecter les grossistes et les détaillants au Maroc.</p>
        </div>

        {/* Section 2 : Liens rapides */}
        <div className="footer-section">
          <h3>Liens rapides</h3>
          <ul>
            <li><a href="/WholesaleHub/home">Accueil</a></li>
            <li><a href="/WholesaleHub/Magasins">Magasins</a></li>
            <li><a href="/WholesaleHub/About">À propos</a></li>
          </ul>
        </div>

        {/* Section 3 : Contact */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email : yassineelbahi44@gmail.com</p>
          <p>Téléphone : +212 6 06 46 25 57</p>
          <p>Adresse : Casablanca, Maroc</p>
        </div>

        {/* Section 4 : Réseaux sociaux */}
        <div className="footer-section">
          <h3>Suivez-nous</h3>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 WholesaleHub. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
