import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByUser } from "../../features/products/productSlice";
import "../style/Productlist.css";

function Productslist() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByUser());
  }, [dispatch]);

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p className="error">Erreur : {error}</p>;
  if (products.length === 0) return <p>Aucun produit trouvé</p>;

  return (
    <div className="products-container">
      <h2>Liste des produits de mon magasin</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Description</th>
            <th>Type</th>
            <th>Stock</th>
            <th>Minimum</th>
            <th>Prix Achat</th>
            <th>Prix Vente</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                {p.img_url ? (
                  <img src={p.img_url} alt={p.name} className="product-img" />
                ) : (
                  <span>Pas d'image</span>
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>{p.type}</td>
              <td>{p.stoke}</td>
              <td>{p.min}</td>
              <td>{p.prix_achat} MAD</td>
              <td>{p.prix_vente} MAD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Productslist;
