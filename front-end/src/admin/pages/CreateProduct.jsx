import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/products/productSlice";
import axios from "axios";
import "../style/create.css";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (file) => {
  if (!file) return null;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const res = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );
  return res.data.secure_url;
};

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    stoke: "",
    min: "",
    prix_achat: "",
    prix_vente: "",
    img_url: "",
  });

  const [imgFile, setImgFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = "";
    if (imgFile) {
      imgUrl = await uploadToCloudinary(imgFile);
    }

    const dataToSend = { ...formData, img_url: imgUrl };

    const action = await dispatch(createProduct(dataToSend));

    if (createProduct.fulfilled.match(action)) {
      setSuccessMessage(" Produit créé avec succès !");
      setFormData({
        name: "",
        description: "",
        type: "",
        stoke: "",
        min: "",
        prix_achat: "",
        prix_vente: "",
        img_url: "",
      });
      setImgFile(null);
      // enlever le message après 7 secondes
      setTimeout(() => setSuccessMessage(""), 7000);
    }
  };

  return (
    <div className="page-create">
      <h2 className="create-titre"> Ajouter un Produit</h2>

      <form onSubmit={handleSubmit} className="form-create">
        {/* Nom */}
        <div>
          <label className="label-create">Nom du Produit</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label-create">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="label-create">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="label-create">Stock</label>
          <input
            type="number"
            name="stoke"
            value={formData.stoke}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Stock Minimum */}
        <div>
          <label className="label-create">Min pour achat</label>
          <input
            type="number"
            name="min"
            value={formData.min}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Prix Achat */}
        <div>
          <label className="label-create">Prix d'Achat</label>
          <input
            type="number"
            step="0.01"
            name="prix_achat"
            value={formData.prix_achat}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Prix Vente */}
        <div>
          <label className="label-create">Prix de Vente</label>
          <input
            type="number"
            step="0.01"
            name="prix_vente"
            value={formData.prix_vente}
            onChange={handleChange}
            className="input-create"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="label-create">Image du Produit</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImgFile(e.target.files[0])}
            className="input-create"
          />
          {imgFile && (
            <img
              src={URL.createObjectURL(imgFile)}
              alt="preview"
              className="img-create"
            />
          )}
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="button-create"
          disabled={loading}
        >
          {loading ? "Création..." : "Ajouter le Produit"}
        </button>

        {/* Message d'erreur */}
        {error && <p className="text-error-create">{error}</p>}

        {/* Message de succès */}
        {successMessage && (
          <p className="text-success-create">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
