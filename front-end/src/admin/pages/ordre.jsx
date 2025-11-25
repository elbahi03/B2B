import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdresByStoreId, updateOrdre, deleteOrdre } from "../../features/orders/ordreSlice";
import "../style/ordre.css";

export default function Ordre() {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.products);
    console.log("products", products);
    const { ordres, loading, error } = useSelector((state) => state.ordres);
    const [selectedOrdre, setSelectedOrdre] = useState(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        dispatch(fetchOrdresByStoreId());
    }, [dispatch]);

    const getProductName = (id) => {
        const prod = products.find((p) => p.id === id);
        return prod ? prod.name : `Produit #${id}`;
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        dispatch(updateOrdre({ id: selectedOrdre.id, updatedData: { status } }));
        setSelectedOrdre(null);
    };

    const handleDelete = (id) => {
        if (window.confirm("Voulez-vous supprimer cet ordre ?")) {
            dispatch(deleteOrdre(id));
        }
    };

    return (
        <div className="orders-container">
            <h2 className="orders-title">Gestion des Ordres</h2>

            {loading && <p>Chargement...</p>}
            {error && <p className="error-msg">{error}</p>}

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Produits</th>
                        <th>Prix Total</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {ordres.map((ordre) => (
                        <tr key={ordre.id}>
                            <td>{ordre.id}</td>
                            <td>{ordre.user_id}</td>
                            <td className="products-cell">
                                {Array.isArray(ordre.produits_commandes) && ordre.produits_commandes.length > 0
                                    ? ordre.produits_commandes.map((p, i) => (
                                        <span key={i} className="product-tag">
                                            {getProductName(p.products_id)} * {p.quantite}
                                        </span>
                                    ))
                                    : "Aucun produit"}
                            </td>
                            <td>{ordre.prix_total} DH</td>
                            <td className={`status ${ordre.status}`}>{ordre.status}</td>
                            <td>{new Date(ordre.created_at).toLocaleString()}</td>

                            <td>
                                <button
                                    className="btn edit"
                                    onClick={() => {
                                        setSelectedOrdre(ordre);
                                        setStatus(ordre.status);
                                    }}
                                >
                                    Modifier
                                </button>

                                <button className="btn delete" onClick={() => handleDelete(ordre.id)}>
                                    Supprimer
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedOrdre && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Modifier l'état</h3>

                        <form onSubmit={handleUpdate}>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="en cours">En cours</option>
                                <option value="terminee">Terminée</option>
                                <option value="annulee">Annulée</option>
                            </select>

                            <div className="modal-buttons">
                                <button type="submit" className="btn save">Sauvegarder</button>
                                <button type="button" className="btn cancel" onClick={() => setSelectedOrdre(null)}>
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}
