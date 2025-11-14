import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../../features/stores/storeSlice";
import { fetchProductByStoreId } from "../../features/products/productSlice";
import { createOrdre } from "../../features/orders/ordreSlice";
import jsPDF from "jspdf";

function StoreDetails() {
  const dispatch = useDispatch();
  const id = window.location.pathname.split("/").pop();

  const { currentStore, loading, error } = useSelector((state) => state.stores);
  const { products } = useSelector((state) => state.products);
  const ordreState = useSelector((state) => state.ordres);

  // 🛒 Panier : { productId: { produit, quantite } }
  const [cart, setCart] = useState({});

  useEffect(() => {
    dispatch(fetchStoreById(id));
    dispatch(fetchProductByStoreId(id));
  }, [dispatch, id]);

  const toggleProduct = (product) => {
    setCart((prev) => {
      if (prev[product.id]) {
        const updated = { ...prev };
        delete updated[product.id];
        return updated;
      }
      return { ...prev, [product.id]: { produit: product, quantite: 1 } };
    });
  };

  const increaseQuantity = (productId) => {
    setCart((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        quantite: prev[productId].quantite + 1,
      },
    }));
  };

  const decreaseQuantity = (productId) => {
    setCart((prev) => {
      const qty = prev[productId].quantite - 1;
      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: { ...prev[productId], quantite: qty } };
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
  

  // 📌 Carte visite PDF (inchangé)
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

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  const totalPrice = Object.values(cart).reduce(
    (sum, c) => sum + c.produit.prix_vente * c.quantite,
    0
  );

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🏬 {currentStore?.Store?.name}
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={currentStore?.Store?.logo_url || "https://via.placeholder.com/200?text=Store"}
            alt={currentStore?.Store?.name}
            className="w-48 h-48 object-cover rounded-xl shadow-md border"
          />
        </div>

        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 mb-4"
          onClick={generateCard}
        >
          📇 Télécharger Carte Visite
        </button>

        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">
          <p><strong>📍 Ville :</strong> {currentStore?.Store?.ville}</p>
          <p><strong>🗺️ Localisation :</strong> {currentStore?.Store?.localisation}</p>
          <p><strong>📞 Téléphone :</strong> {currentStore?.Store?.phone}</p>
          <p><strong>🏷️ Catégorie :</strong> {currentStore?.Store?.categorie_id}</p>
          <p><strong>📝 Description :</strong> {currentStore?.Store?.description}</p>
        </div>

        <button
          className="bg-gray-700 text-white px-6 py-2 rounded-lg mt-6"
          onClick={() => window.location.replace("/WholesaleHub/magasins")}
        >
          ⬅ Retour
        </button>
      </div>

      {/* Produits */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">🛒 Sélectionner les produits</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => {
            const selected = cart[product.id];
            return (
              <div
                key={product.id}
                className={`bg-white shadow-md rounded-xl p-4 border transition ${
                  selected ? "border-green-500" : ""
                }`}
              >
                <img
                  src={product.img_url || "https://via.placeholder.com/150"}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p>Type : {product.type}</p>
                <p className="font-bold">Prix : {product.prix_vente} DH</p>
                <p>Stock : {product.stoke}</p>

                {selected ? (
                  <div className="flex items-center mt-2 space-x-2">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="bg-red-500 text-white px-2 rounded"
                    >
                      -
                    </button>
                    <span>{selected.quantite}</span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="bg-green-500 text-white px-2 rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => toggleProduct(product)}
                      className="ml-2 text-gray-500 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleProduct(product)}
                    className="bg-blue-600 text-white px-4 py-1 mt-2 rounded-lg hover:bg-blue-700"
                  >
                    Ajouter
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Panier */}
        {Object.keys(cart).length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 rounded-xl shadow">
            <h3 className="font-bold mb-2">Panier</h3>
            <ul>
              {Object.values(cart).map((c) => (
                <li key={c.produit.id}>
                  {c.produit.name} x {c.quantite} ={" "}
                  {c.produit.prix_vente * c.quantite} DH
                </li>
              ))}
            </ul>
            <p className="font-bold mt-2">Total : {totalPrice} DH</p>
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg mt-3 hover:bg-green-700"
              onClick={handleCreateOrder}
            >
              ✔️ Créer la commande
            </button>
          </div>
        )}

        {ordreState.loading && <p className="text-blue-600 mt-2">Création...</p>}
        {ordreState.error && <p className="text-red-600 mt-2">{ordreState.error}</p>}
      </div>
    </>
  );
}

export default StoreDetails;
