import React from "react";

const ItemList = ({ items, type, showDelete, onDeleteClick }) => {
  if (!items.length) {
    return (
      <p className="text-sm text-gray-500 mt-4">
        No {type === "lost" ? "lost" : "found"} items yet.
      </p>
    );
  }

  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li
          key={item._id}
          className="bg-white border border-gray-200 rounded-lg p-3 text-sm flex justify-between gap-4"
        >
          <div>
            <div className="font-semibold text-gray-800">{item.title}</div>
            {item.description && (
              <div className="text-gray-600 text-xs mt-1">
                {item.description}
              </div>
            )}
            <div className="text-gray-500 text-xs mt-1 flex flex-wrap gap-2">
              {item.location && <span>📍 {item.location}</span>}
              {item.date && (
                <span>
                  📅 {new Date(item.date).toLocaleDateString("en-IN")}
                </span>
              )}
              {item.contactInfo && <span>☎️ {item.contactInfo}</span>}
            </div>
            {(item.createdByName || item.createdByUsn) && (
              <div className="text-gray-400 text-xs mt-1">
                Reported by{" "}
                {item.createdByName ? item.createdByName : "Unknown"}{" "}
                {item.createdByUsn ? `(${item.createdByUsn})` : ""}
              </div>
            )}
          </div>
          {showDelete && (
            <button
              className="text-xs text-red-600 hover:text-red-800 self-start"
              onClick={() => onDeleteClick(item)}
            >
              Delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
