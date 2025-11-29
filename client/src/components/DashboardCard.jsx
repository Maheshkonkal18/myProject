import React from "react";

const DashboardCard = ({ title, description, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 transition text-left"
    >
      <h3 className="text-sm font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{description}</p>
    </button>
  );
};

export default DashboardCard;
