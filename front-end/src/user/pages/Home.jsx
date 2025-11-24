import React from "react";
import Footer from "../Component/footer";
import "./../style/Home.css";
import Header from "../Component/header";
function Home() {
  if (localStorage.getItem("token")) {
    window.location.href = "/WholesaleHub/home";
  }
  return (
    <>
    <Header />
    <div className="home">
      <div className="main-content-wrapper"> 
        <section className="hero">
          <div className="hero-content">
            <h1>Bienvenue sur <span>WholesaleHub</span></h1>
            <p>La plateforme moderne qui connecte fournisseurs et acheteurs en un clic.</p>
            <a href="/WholesaleHub/Magasins" className="btn">Découvrir maintenant</a>
          </div>
        </section>
        <section className="pourquoi">
          <div className="pourquoi-content">
            <h2>Pourquoi choisir <span>WholesaleHub</span> ?</h2>
            <div className="reasons">
              <div>
                <h3>✔ Expérience simple et rapide</h3>
                <p>Notre interface intuitive facilite vos commandes et vos recherches.</p>
              </div>
              <div>
                <h3>✔ Sécurité et fiabilité</h3>
                <p>Vos transactions sont protégées et vos partenaires sont vérifiés.</p>
              </div>
              <div>
                <h3>✔ Support 24/7</h3>
                <p>Une équipe à votre écoute pour répondre à vos besoins à tout moment.</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Home;