import React from "react";
import Header from "../Component/header";
import Footer from "../Component/footer";
import "../style/Apropos.css";

function About() {
  return (
    <>
      <Header />
      <div className="about-page">
        
        {/* Section 1: Introduction et Mission (Style Hero) */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>Notre Mission : Révolutionner le Commerce de Gros.</h1>
            <p>
              [cite_start]WholesaleHub est né de la volonté de simplifier et d'automatiser le processus d'achat en gros au Maroc[cite: 3].
              Nous éliminons les pertes de temps liées au contact de multiples fournisseurs, en offrant une plateforme unique et centralisée pour toutes vos transactions B2B.
            </p>
            <a href="/WholesaleHub/Magasins" className="btn">Commencer à acheter</a>
          </div>
        </section>

        {/* Section 2: Problème et Solution */}
        <section className="about-problem-solution">
          <div className="solution-block">
            <h2>Le Problème Aujourd'hui</h2>
            <p className="problem-statement">
              [cite_start]Le secteur B2B du gros souffre d'un manque de plateforme dédiée et d'un processus de commande manuel et chronophage[cite: 8, 9]. [cite_start]Les fournisseurs manquent d'outils centralisés pour gérer leurs catalogues et leurs ventes[cite: 6, 11].
            </p>
          </div>
          <div className="solution-block solution-reverse">
            <h2>La Solution WholesaleHub</h2>
            <p className="solution-statement">
              [cite_start]Nous fournissons une plateforme sécurisée pour les achats en gros [cite: 13][cite_start], offrant une expérience utilisateur optimale aux acheteurs professionnels[cite: 16].
              [cite_start]Grâce à l'automatisation de la commande et à des outils de gestion intégrés pour les fournisseurs[cite: 14, 15], nous rendons l'efficacité accessible à tous.
            </p>
          </div>
        </section>

        {/* Section 3: Nos Engagements (Piliers) */}
        <section className="about-engagements">
            <h2 className="engagements-title">Nos Engagements</h2>
            <div className="pillars-grid">
                <div className="pillar-card">
                    <h3>Sécurité & Fiabilité</h3>
                    [cite_start]<p>Développer une plateforme B2B sécurisée et garantir la protection de vos transactions est notre priorité absolue[cite: 13].</p>
                </div>
                <div className="pillar-card">
                    <h3>Efficacité & Automatisation</h3>
                    [cite_start]<p>Nous automatisons l'intégralité du processus de commande et de facturation [cite: 14] pour un gain de temps maximal.</p>
                </div>
                <div className="pillar-card">
                    <h3>Transparence & Traçabilité</h3>
                    [cite_start]<p>Fournir l'historique complet des commandes et la possibilité de télécharger des bons de commande PDF [cite: 24, 25] garantit une traçabilité totale.</p>
                </div>
            </div>
        </section>

      </div>
      <Footer />
    </>
  );
}

export default About;