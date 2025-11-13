import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchStores } from "../../features/stores/storeSlice";

function Stores() {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🛍️ Nos Magasins
      </h1>

      {loading && <p className="text-center text-blue-500">Chargement des magasins...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {!loading && stores?.length > 0 ? (
          stores.map((store) => (
            <div
              key={store.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-4 flex flex-col items-center"
            >
              {/* Logo */}
              <img
                src={store.logo_url || "https://via.placeholder.com/200x150?text=Store"}
                alt={store.name}
                className="w-40 h-40 object-cover rounded-xl mb-4 border"
              />

              {/* Nom */}
              <h2 className="text-xl font-semibold text-gray-800">{store.name}</h2>

              {/* Ville */}
              <p className="text-gray-600 mt-1">🏙️ {store.ville}</p>

              {/* Catégorie */}
              <p className="text-gray-500 mt-1">
                🏷️ Catégorie :{" "}
                {store.categorie?.name || store.categorie_id || "Non spécifiée"}
              </p>

              {/* Bouton */}
              <button
                className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => alert(`Visiter ${store.name}`)}
              >
                Visiter le Store
              </button>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-center text-gray-500 col-span-full">
              Aucun magasin disponible pour le moment.
            </p>
          )
        )}
      </div>
    </div>
  );
}

export default Stores;
