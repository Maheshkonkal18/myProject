import React, { useEffect, useState } from "react";
import api from "../api.js";
import ItemList from "../components/ItemList.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import { useAuth } from "../components/AuthContext.jsx";

const FoundList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await api.get("/found");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/found/${deleteTarget._id}`);
      setDeleteTarget(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Found Items</h2>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : (
        <ItemList
          items={items}
          type="found"
          showDelete={role === "admin"}
          onDeleteClick={(item) => setDeleteTarget(item)}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete Found Item"
        message="Are you sure you want to delete this found item? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default FoundList;
