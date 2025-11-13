import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStore } from "../../features/stores/storeSlice";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// 🔹 Fonction pour uploader le logo vers Cloudinary
const uploadToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    formData
  );
  return response.data.secure_url;
};

const CreateStore = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.stores);

  const [formData, setFormData] = useState({
    user_id: "",
    categorie_id: "",
    name: "",
    ville: "",
    localisation: "",
    phone: "",
    description: "",
    logo_url: "",
  });
  const [logoFile, setLogoFile] = useState(null);

  // 🔹 Mise à jour des inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let logoUrl = "";
      if (logoFile) {
        logoUrl = await uploadToCloudinary(logoFile);
      }

      const dataToSend = { ...formData, logo_url: logoUrl };
      dispatch(createStore(dataToSend));
      console.log("✅ Store créé avec succès !");
      setFormData({
        user_id: "",
        categorie_id: "",
        name: "",
        ville: "",
        localisation: "",
        phone: "",
        description: "",
        logo_url: "",
      });
      setLogoFile(null);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la création du store.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">🛍️ Créer un nouveau Store</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ID utilisateur */}
        <div>
          <label className="block mb-1 font-medium">User ID</label>
          <input
            type="number"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Catégorie */}
        <div>
          <label className="block mb-1 font-medium">Catégorie ID</label>
          <input
            type="number"
            name="categorie_id"
            value={formData.categorie_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Nom */}
        <div>
          <label className="block mb-1 font-medium">Nom du Store</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Ville */}
        <div>
          <label className="block mb-1 font-medium">Ville</label>
          <input
            type="text"
            name="ville"
            value={formData.ville}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Localisation */}
        <div>
          <label className="block mb-1 font-medium">Localisation</label>
          <input
            type="text"
            name="localisation"
            value={formData.localisation}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Téléphone */}
        <div>
          <label className="block mb-1 font-medium">Téléphone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
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

        {/* Logo Upload */}
        <div>
          <label className="block mb-1 font-medium">Logo du Store</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="w-full border rounded p-2"
          />
          {logoFile && (
            <img
              src={URL.createObjectURL(logoFile)}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded-xl border"
            />
          )}
        </div>

        {/* Bouton */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Création..." : "Créer le Store"}
        </button>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateStore;
