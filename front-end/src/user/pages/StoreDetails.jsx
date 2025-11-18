import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../../features/stores/storeSlice";
import { fetchProductByStoreId } from "../../features/products/productSlice";
import { createOrdre } from "../../features/orders/ordreSlice";
import jsPDF from "jspdf";
import Header from "../Component/header";
import Footer from "../Component/footer";
import "../style/details.css";

function StoreDetails() {
  const dispatch = useDispatch();
  const id = window.location.pathname.split("/").pop();

  const { currentStore, loading, error } = useSelector((state) => state.stores);
  const { products } = useSelector((state) => state.products);
  const ordreState = useSelector((state) => state.ordres);

  const [cart, setCart] = useState({});

  useEffect(() => {
    dispatch(fetchStoreById(id));
    dispatch(fetchProductByStoreId(id));
  }, [dispatch, id]);

  // add & remove product .
  const toggleProduct = (product) => {
    setCart((prev) => {
      if (prev[product.id]) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }
      return { ...prev, [product.id]: { produit: product, quantite: product.min } };
    });
  };

  // change qty of product .
  const increaseQuantity = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...prev[product.id],
        quantite: prev[product.id].quantite + 1,
      },
    }));
  };

  const decreaseQuantity = (product) => {
    setCart((prev) => {
      const qty = prev[product.id].quantite - 1;
      if (qty <= product.min) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }
      return { ...prev, [product.id]: { ...prev[product.id], quantite: qty } };
    });
  };

  const handleCreateOrder = () => {
    const produits_commandes = Object.values(cart).map((c) => ({
      products_id: c.produit.id,
      quantite: c.quantite,
    }));

    if (produits_commandes.length === 0) {
      alert("Veuillez sélectionner au moins un produit !");
      return;
    }

    dispatch(createOrdre({ store_id: id, produits_commandes, status: "en cours" }));
  };


  //  Carte visite PDF (inchangé)
  const generateCard = () => {
    const store = currentStore?.Store;
    if (!store) return;

    const width = 240;
    const height = 155;
    const doc = new jsPDF({ unit: "pt", format: [width, height] });

    const logo = store.logo_url || "https://via.placeholder.com/100";
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;

    img.onload = () => {
      const logoWidth = 80;
      const logoHeight = 80;
      const logoX = (width - logoWidth) / 2;
      doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);

      const text = `
    ${store.name}
    ${store.ville}
    ${store.localisation}
    ${store.phone}
  ${store.description || ""}
`;
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.text(text, 20, height - 55, { maxWidth: width - 40 });
      doc.save(`carte_visite_${store.name}.pdf`);
    };
  };

  if (loading) return <p className="loading-message">Chargement...</p>;
  if (error) return <p className="error-message">{error}</p>;

  const totalPrice = Object.values(cart).reduce(
    (sum, c) => sum + c.produit.prix_vente * c.quantite,
    0
  );

  return (
    <>
      <Header />
      <div className="store-details-page"> 
        <div className="store-header">
          <div className="store-info-left">
            <img
              src={currentStore?.Store?.logo_url || "https://via.placeholder.com/100?text=Logo"}
              alt={currentStore?.Store?.name}
              className="store-logo"
            />
            <div className="store-details-text">
              <h1 className="store-name">{currentStore?.Store?.name}</h1>
              <p className="detail-item">Ville : {currentStore?.Store?.ville}</p>
              <p className="detail-item">Catégorie : {currentStore?.Store?.categorie_id}</p>
              <p className="detail-item">Localisation : {currentStore?.Store?.localisation}</p>
              <p className="store-description">{currentStore?.Store?.description}</p>
            </div>
          </div>
          <button
            className="btn-card-visit"
            onClick={generateCard}
          >
             CARTE VISITE
          </button>
        </div>

        {/* Section Produits */}
        <div className="products-section">
          <h2 className="products-title">Produits :</h2>

          <div className="products-grid">
            {products.map((product) => {
              const selected = cart[product.id];
              return (
                <div
                  key={product.id}
                  className={`product-card ${selected ? "selected-card" : ""}`}
                >
                  <img
                    src={product.img_url || "https://via.placeholder.com/150"}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">{product.prix_vente} DH</p>
                    <p className="product-min">{product.min}</p> 
                  </div>

                  {selected ? (
                    <div className="quantity-controls">
                      <button
                        onClick={() => decreaseQuantity(product)}
                        className="btn-qty-minus"
                      >
                        -
                      </button>
                      <span className="quantity-display">{selected.quantite}</span>
                      <button
                        onClick={() => increaseQuantity(product)}
                        className="btn-qty-plus"
                      >
                        +
                      </button>
                      <button
                        onClick={() => toggleProduct(product)}
                        className="btn-remove"
                      >
                        Supprimer
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleProduct(product)}
                      className="btn-add-to-cart"
                    >
                      Ajouter
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bouton de commande (Panier) */}
          {Object.keys(cart).length > 0 && (
            <div className="order-summary-container">
              <button
                className="btn-create-order"
                onClick={handleCreateOrder}
                disabled={ordreState.loading}
              >
                 Créer un ordre :
              </button>
              <p className="order-total">Total : {totalPrice} DH</p>
              {ordreState.loading && <p className="loading-order">Création...</p>}
              {ordreState.error && <p className="error-order">{ordreState.error}</p>}
              {ordreState.success && (
                <p className="success-order">Ordre créé avec successe</p>
              )}
            </div>
          )}
          
          {/* Retour */}
          <button
            className="btn-return"
            onClick={() => window.location.replace("/WholesaleHub/magasins")}
          >
            Retour à la liste
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StoreDetails;