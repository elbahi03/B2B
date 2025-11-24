import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../../features/stores/storeSlice";
import { fetchCategories } from "../../features/categories/categorieSlice";
import Header from "../Component/header";
import Footer from "../Component/footer";
import "../style/stores.css";

function Stores() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);
  const { categories } = useSelector((state) => state.categories);
  const [search, setSearch] = useState("");
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    dispatch(fetchStores());
    dispatch(fetchCategories());
  }, [dispatch]);

  // FILTRAGE LOCAL
  const filteredStores = stores?.filter((store) => {
    const term = search.toLowerCase();
    const matchSearch =
      store.name.toLowerCase().includes(term) ||
      store.ville?.toLowerCase().includes(term);
    const matchCategorie =
      selectedCategorie === "" || store.categorie_id == selectedCategorie;
    return matchSearch && matchCategorie;
  });

  return (
    <>
      <Header />
      <div className="stores-page">
        <h1 className="page-title">Nos Magasins</h1>

        {/* BARRE DE RECHERCHE + FILTRE CATÉGORIE */}
        <div className="search-filter-container">
          {/* SEARCH */}
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher par nom ou ville..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* SELECT CATÉGORIE */}
          <select
            className="categorie-select"
            value={selectedCategorie}
            onChange={(e) => setSelectedCategorie(e.target.value)}
          >
            <option value="">Toutes les catégories</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.categorie}
              </option>
            ))}
          </select>
        </div>

        {loading && <p className="loading-message">Chargement des magasins...</p>}
        {error && <p className="error-message">{error}</p>}

        {/* LISTE DES STORES */}
        <div className="stores-grid">
          {!loading && filteredStores?.length > 0 ? (
            filteredStores.map((store) => (
              <div key={store.id} className="store-card">
                <img
                  src={
                    store.logo_url ||
                    "https://via.placeholder.com/200x150?text=Store"
                  }
                  alt={store.name}
                  className="store-logo"
                />

                <h2 className="store-name">{store.name}</h2>
                <p className="store-city">{store.ville}</p>

                <button
                  className="btn-visit"
                  onClick={() =>
                    window.location.replace(`/WholesaleHub/magasin/${store.id}`)
                  }
                >
                  Visiter le Store
                </button>
              </div>
            ))
          ) : (
            !loading && (
              <p className="no-stores-message">Aucun magasin trouvé.</p>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Stores;
