import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkOrdre } from "../../features/orders/ordreSlice";
import "../style/OrdreCheck.css";

export default function OrdreCheck() {
  const dispatch = useDispatch();
  const { currentOrdre, loading, error } = useSelector((state) => state.ordres);
  const { products } = useSelector((state) => state.products);
  const [ordreId, setOrdreId] = useState("");

  const handleCheck = (e) => {
    e.preventDefault();
    if (ordreId) dispatch(checkOrdre(ordreId));
  };

  const getProductName = (id) => {
    const prod = products.find((p) => p.id === id);
    return prod ? prod.name : `Produit #${id}`;
  };

  return (
    <div className="ordre-check-container">
      <h2>Vérifier un ordre</h2>
      <form className="ordre-check-form" onSubmit={handleCheck}>
        <input
          type="number"
          placeholder="Entrez l'ID de l'ordre"
          value={ordreId}
          onChange={(e) => setOrdreId(e.target.value)}
          required
        />
        <button type="submit">Vérifier</button>
      </form>

      {loading && <p>Chargement...</p>}
      {error && <p className="error-msg">{error.message || error}</p>}

      {currentOrdre && (
        <div className="ordre-result">
          <h3>Détails de l'ordre</h3>
          <p><strong>ID:</strong> {currentOrdre.ordre.id}</p>
          <p><strong>Status:</strong> {currentOrdre.ordre.status}</p>
          <p><strong>Prix total:</strong> {currentOrdre.ordre.prix_total} DH</p>
          <p><strong>Date:</strong> {new Date(currentOrdre.ordre.created_at).toLocaleString()}</p>
          <p><strong>Produits:</strong></p>
          <ul>
            {currentOrdre.ordre.produits_commandes.map((p, i) => (
              <li key={i}>{getProductName(p.products_id)} x {p.quantite}</li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !currentOrdre && !error && ordreId && (
        <p className="not-found-msg">Aucun ordre trouvé avec cet ID</p>
      )}
    </div>
  );
}
