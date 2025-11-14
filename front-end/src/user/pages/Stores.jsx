import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../../features/stores/storeSlice";
import Header from "../Component/header";
import Footer from "../Component/footer";
import "../style/stores.css";

function Stores() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <>
      <Header />
    <div className="stores-page">
      <h1 className="page-title">
         Nos Magasins
      </h1>

      {loading && <p className="loading-message">Chargement des magasins...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="stores-grid">
        {!loading && stores?.length > 0 ? (
          stores.map((store) => (
            <div
              key={store.id}
              className="store-card"
            >
              {/* Logo */}
              <img
                src={store.logo_url || "https://via.placeholder.com/200x150?text=Store"}
                alt={store.name}
                className="store-logo"
              />

              {/* Nom */}
              <h2 className="store-name">{store.name}</h2>

              {/* Ville */}
              <p className="store-city"> {store.ville}</p>

              {/* Catégorie */}
              <p className="store-category">
                 Catégorie :{" "}
                {store.categorie?.name || store.categorie_id || "Non spécifiée"}
              </p>

              {/* Bouton */}
              <button
                className="btn-visit"
                onClick={() => window.location.replace(`/WholesaleHub/magasin/${store.id}`)}
              >
                Visiter le Store
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <p className="no-stores-message">
              Aucun magasin disponible pour le moment.
            </p>
          )
        )}
      </div>
    </div>
      <Footer />
    </>
  );
}

export default Stores;
