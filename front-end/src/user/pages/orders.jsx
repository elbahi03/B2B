import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdresByUserId } from "../../features/orders/ordreSlice";
import { fetchProducts } from "../../features/products/productSlice";
import { fetchStores } from "../../features/stores/storeSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Orders() {
    const dispatch = useDispatch();

    const { ordres, loading: ordresLoading, error: ordresError } = useSelector((state) => state.ordres);
    const { products, loading: productsLoading } = useSelector((state) => state.products);
    const { stores, loading: storesLoading } = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(fetchOrdresByUserId());
        if (products.length === 0) dispatch(fetchProducts());
        if (stores.length === 0) dispatch(fetchStores());
    }, [dispatch, products.length, stores.length]);

    if (ordresLoading || productsLoading || storesLoading) return <p>Chargement...</p>;
    if (ordresError) return <p className="text-red-600">{ordresError}</p>;

    function generatePDF(ordre, products, store) {
        const doc = new jsPDF();

        // Titre
        doc.setFontSize(18);
        doc.text("Bon de Commande", 105, 20, null, null, "center");

        // Infos commande
        doc.setFontSize(12);
        doc.text(`Ordre ID : ${ordre.id}`, 14, 30);
        doc.text(`Store : ${store ? store.name : "Inconnu"}`, 14, 37);
        doc.text(`Ville : ${store ? store.ville : "Inconnue"}`, 14, 44);
        doc.text(`Date : ${new Date(ordre.created_at).toLocaleDateString()}`, 14, 51);

        // Table produits
        const tableData = ordre.produits_commandes.map((item, idx) => {
            const product = products.find((p) => p.id === item.products_id);
            return [
                idx + 1,
                product ? product.name : "Produit supprimé",
                item.quantite,
                product ? product.prix_vente : 0,
                product ? product.prix_vente * item.quantite : 0,
            ];
        });

        autoTable(doc, {
            startY: 60,
            head: [["#", "Produit", "Quantité", "Prix Unitaire", "Total"]],
            body: tableData,
        });

        // Total
        const totalPrice = ordre.produits_commandes.reduce(
            (sum, item) => sum + item.quantite * (products.find((p) => p.id === item.products_id)?.prix_vente || 0),
            0
        );
        doc.setFontSize(14);
        doc.text(`TOTAL : ${totalPrice} DH`, 14, doc.lastAutoTable.finalY + 10);

        // Télécharger
        doc.save(`bon_commande_${ordre.id}.pdf`);
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Mes Commandes</h1>

            {ordres.length === 0 ? (
                <p>Aucune commande trouvée.</p>
            ) : (
                ordres.map((ordre) => {
                    const store = stores.find((s) => s.id === ordre.store_id);
                    const totalPrice = ordre.produits_commandes.reduce(
                        (sum, item) => sum + item.quantite * (products.find((p) => p.id === item.products_id)?.prix_vente || 0),
                        0
                    );

                    return (
                        <details key={ordre.id} className="mb-4 border rounded-lg p-4 bg-white shadow">
                            <summary className="flex justify-between items-center cursor-pointer">
                                <div>
                                    <strong>Ordre ID :</strong> {ordre.id} <br />
                                </div>
                                <button
                                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const store = stores.find((s) => s.id === ordre.store_id);
                                        generatePDF(ordre, products, store);
                                    }}
                                >
                                    Télécharger bon
                                </button>
                            </summary>
                            <strong>Store :</strong> {store ? store.name : "Inconnu"} <br />
                            <strong>Ville :</strong> {store ? store.ville : "Inconnue"}
                            <ul className="mt-2">
                                {ordre.produits_commandes.map((item, index) => {
                                    const product = products.find((p) => p.id === item.products_id);
                                    return (
                                        <li key={index} className="mb-1">
                                            <strong>Produit :</strong> {product ? product.name : "Produit supprimé"} <br />
                                            <strong>Quantité :</strong> {item.quantite} <br />
                                            <strong>Prix :</strong> {product ? product.prix_vente * item.quantite : 0} DH
                                        </li>
                                    );
                                })}
                            </ul>

                            <h2 className="mt-2 font-bold">TOTAL : {totalPrice} DH</h2>
                        </details>
                    );
                })
            )}
        </div>
    );
}

export default Orders;
