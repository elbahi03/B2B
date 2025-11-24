import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStoresAuth } from "../../features/stores/storeSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentStore, loading } = useSelector((state) => state.stores);

  useEffect(() => {
    dispatch(fetchStoresAuth());
  }, [dispatch]);

  if (loading) return <p>Chargement...</p>;

  if (!currentStore) return <p>Aucun magasin trouvé pour cet admin.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord</h1>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Informations du Magasin</h2>

        <p><strong>Nom :</strong> {currentStore?.[0]?.name}</p>
        <p><strong>Ville :</strong> {currentStore?.[0]?.ville}</p>
        <p><strong>Localisation :</strong> {currentStore?.[0]?.localisation}</p>
        <p><strong>Téléphone :</strong> {currentStore?.[0]?.phone}</p>
        <p><strong>Description :</strong> {currentStore?.[0]?.description}</p>
        <p><strong>Catégorie :</strong> {currentStore?.[0]?.categorie_id}</p>

        {currentStore?.[0]?.logo_url && (
          <img
            src={currentStore?.[0]?.logo_url}
            alt="Logo"
            className="w-20 mt-3 rounded"
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
