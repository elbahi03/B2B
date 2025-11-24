import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../features/products/productSlice";
import axios from "axios";

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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6"> Ajouter un Produit</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Nom du Produit</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Type */}
        <div>
          <label className="block mb-1 font-medium">Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-1 font-medium">Stock</label>
          <input
            type="number"
            name="stoke"
            value={formData.stoke}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Stock Minimum */}
        <div>
          <label className="block mb-1 font-medium">Min pour achat</label>
          <input
            type="number"
            name="min"
            value={formData.min}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Prix Achat */}
        <div>
          <label className="block mb-1 font-medium">Prix d'Achat</label>
          <input
            type="number"
            step="0.01"
            name="prix_achat"
            value={formData.prix_achat}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Prix Vente */}
        <div>
          <label className="block mb-1 font-medium">Prix de Vente</label>
          <input
            type="number"
            step="0.01"
            name="prix_vente"
            value={formData.prix_vente}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image du Produit</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImgFile(e.target.files[0])}
            className="w-full border rounded p-2"
          />
          {imgFile && (
            <img
              src={URL.createObjectURL(imgFile)}
              alt="preview"
              className="mt-3 w-32 h-32 object-cover rounded-xl border"
            />
          )}
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? "Création..." : "Ajouter le Produit"}
        </button>

        {/* Message d'erreur */}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {/* Message de succès */}
        {successMessage && (
          <p className="text-green-600 text-center mt-2">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
