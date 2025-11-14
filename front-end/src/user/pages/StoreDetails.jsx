import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoreById } from "../../features/stores/storeSlice";
import { fetchProductByStoreId } from "../../features/products/productSlice";
import jsPDF from "jspdf";

function StoreDetails() {
  const dispatch = useDispatch();

  // Récupérer ID depuis l’URL
  const id = window.location.pathname.split("/").pop();

  const { currentStore, loading, error } = useSelector((state) => state.stores);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchStoreById(id));
    dispatch(fetchProductByStoreId(id));
  }, [dispatch, id]);

  // function de telechargement de la carte visite
  const generateCard = () => {
    const store = currentStore?.Store;
    if (!store) return;

    // Taille carte visite 85mm x 55mm ≈ 240 x 155 pts
    const width = 240;
    const height = 155;

    const doc = new jsPDF({
      unit: "pt",
      format: [width, height],
    });

    const logo = store.logo_url || "https://via.placeholder.com/100";

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;

    img.onload = () => {
      // 🖼️ Logo centré en haut
      const logoWidth = 80;
      const logoHeight = 80;
      const logoX = (width - logoWidth) / 2;

      doc.addImage(img, "PNG", logoX, 10, logoWidth, logoHeight);

      // 📝 Texte en bas
      const text = `
          ${store.name}
          ${store.ville}
          ${store.localisation}
          ${store.phone}

          ${store.description || ""}
`;

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);

      const x = 20;
      const y = height - 55;

      doc.text(text, x, y, {
        maxWidth: width - 40,
        lineHeightFactor: 1.3,
      });

      // Télécharger
      doc.save(`carte_visite_${store.name}.pdf`);
    };
  };
  if (loading) return <p className="text-center text-blue-500">Chargement...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!currentStore)
    return <p className="text-center text-gray-500">Magasin introuvable.</p>;

  return (
    <>
      <div className="max-w-3xl mx-auto p-6">
        {/* Titre */}
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🏬 {currentStore?.Store?.name}
        </h1>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={currentStore?.Store?.logo_url || "https://via.placeholder.com/200?text=Store"}
            alt={currentStore?.Store?.name}
            className="w-48 h-48 object-cover rounded-xl shadow-md border"
          />
        </div>
        {/* carte visite */}
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 mb-4"
          onClick={generateCard}
        >
          📇 Télécharger Carte Visite
        </button>
        {/* Informations */}
        <div className="bg-white shadow-lg rounded-xl p-6 space-y-4">

          <p className="text-gray-700 text-lg">
            <strong>📍 Ville :</strong> {currentStore?.Store?.ville}
          </p>

          <p className="text-gray-700 text-lg">
            <strong>🗺️ Localisation :</strong> {currentStore?.Store?.localisation}
          </p>

          <p className="text-gray-700 text-lg">
            <strong>📞 Téléphone :</strong> {currentStore?.Store?.phone}
          </p>

          <p className="text-gray-700 text-lg">
            <strong>🏷️ Catégorie :</strong>{" "}
            {currentStore?.Store?.categorie_id || "Non spécifiée"}
          </p>

          <p className="text-gray-700 text-lg">
            <strong>📝 Description :</strong> <br />
            {currentStore?.Store?.description}
          </p>
        </div>

        {/* Bouton retour */}
        <div className="mt-6 text-center">
          <button
            className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-900"
            onClick={() => window.location.replace("/WholesaleHub/magasins")}
          >
            ⬅ Retour aux magasins
          </button>
        </div>
      </div>
      {/* Produits du store */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">🛒 Produits disponibles</h2>

        {products.length === 0 ? (
          <p className="text-gray-500">Aucun produit trouvé pour ce magasin.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={product.img_url || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />

                {/* Nom */}
                <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

                {/* Type */}
                <p className="text-gray-600 text-sm">Type : {product.type}</p>

                {/* Prix */}
                <p className="text-gray-900 font-bold mt-1">
                  Prix : {product.prix_vente} DH
                </p>

                {/* Stock */}
                <p className="text-gray-500 text-sm">
                  Stock : {product.stoke} pièces
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </>
  );
}

export default StoreDetails;
