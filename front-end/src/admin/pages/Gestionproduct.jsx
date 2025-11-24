import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductsByUser,
  deleteProduct,
  updateProduct,
} from "../../features/products/productSlice";
import "../style/Gestion.css";

const Gestionproduct = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  const [editProduct, setEditProduct] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByUser());
  }, [dispatch]);

  const handleDelete = (id) => setDeleteProductId(id);
  const confirmDelete = () => {
    dispatch(deleteProduct(deleteProductId));
    setDeleteProductId(null);
  };
  const cancelDelete = () => setDeleteProductId(null);

  const handleEditChange = (e) =>
    setEditData({ ...editData, [e.target.name]: e.target.value });

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: editProduct.id, updatedData: editData }));
    setEditProduct(null);
  };

  return (
    <div className="gestion-container">
      <h2 className="gestion-title">Gestion des Produits</h2>

      {loading && <p className="info-text">Chargement...</p>}
      {error && <p className="error-text">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            {product.img_url && (
              <img
                src={product.img_url}
                alt={product.name}
                className="product-img"
              />
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-desc">{product.description}</p>

            <div className="product-actions">
              <button
                className="btn btn-red"
                onClick={() => handleDelete(product.id)}
              >
                Supprimer
              </button>
              <button
                className="btn btn-blue"
                onClick={() => {
                  setEditProduct(product);
                  setEditData({
                    name: product.name,
                    description: product.description,
                    type: product.type,
                    stoke: product.stoke,
                    min: product.min,
                    prix_achat: product.prix_achat,
                    prix_vente: product.prix_vente,
                  });
                }}
              >
                Modifier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Modification */}
      {editProduct && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">Modifier le produit</h3>
            <form onSubmit={handleUpdate} className="modal-form">
            <label htmlFor="name">Nom</label>
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleEditChange}
                placeholder="Nom"
                required
              />
            <label htmlFor="description">Description</label>
              <input
                type="text"
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="Description"
                required
              />
            <label htmlFor="type">Type</label>
              <input
                type="text"
                name="type"
                value={editData.type}
                onChange={handleEditChange}
                placeholder="Type"
                required
              />
            <label htmlFor="stoke">Stock</label>
              <input
                type="number"
                name="stoke"
                value={editData.stoke}
                onChange={handleEditChange}
                placeholder="Stock"
                required
              />
            <label htmlFor="min">minimum de achat</label>
              <input
                type="number"
                name="min"
                value={editData.min}
                onChange={handleEditChange}
                placeholder="Stock minimum"
                required
              />
            <label htmlFor="prix_achat">Prix d'achat</label>
              <input
                type="number"
                step="0.01"
                name="prix_achat"
                value={editData.prix_achat}
                onChange={handleEditChange}
                placeholder="Prix d'achat"
                required
              />
            <label htmlFor="prix_vente">Prix de vente</label>
              <input
                type="number"
                step="0.01"
                name="prix_vente"
                value={editData.prix_vente}
                onChange={handleEditChange}
                placeholder="Prix de vente"
                required
              />

              <div className="modal-buttons">
                <button type="submit" className="btn btn-green">
                  Sauvegarder
                </button>
                <button
                  type="button"
                  onClick={() => setEditProduct(null)}
                  className="btn btn-gray"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Suppression */}
      {deleteProductId && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="modal-title">Confirmer la suppression</h3>
            <p>Voulez-vous vraiment supprimer ce produit ?</p>
            <div className="modal-buttons">
              <button className="btn btn-red" onClick={confirmDelete}>
                Supprimer
              </button>
              <button className="btn btn-gray" onClick={cancelDelete}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gestionproduct;
