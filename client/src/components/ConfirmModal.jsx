import React from "react";

const ConfirmModal = ({ open, title, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-lg border border-gray-200 w-full max-w-sm p-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-xs text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-2 text-xs">
          <button
            onClick={onCancel}
            className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
