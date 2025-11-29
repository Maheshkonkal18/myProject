import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard.jsx";
import { useAuth } from "../components/AuthContext.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const { role } = useAuth();  // role can be "student" or "admin"

  return (
    <div className="max-w-5xl mx-auto mt-6 px-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">Dashboard</h2>
      <p className="text-xs text-gray-500 mb-4">
        Quickly report or browse lost and found items in VVCE.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Show report actions only for students */}
        {role === "student" && (
          <>
            <DashboardCard
              title="Report Lost Item"
              description="Submit details of something you lost."
              onClick={() => navigate("/lost/new")}
            />
            <DashboardCard
              title="Report Found Item"
              description="Share details of something you found."
              onClick={() => navigate("/found/new")}
            />
          </>
        )}

        {/* Everyone can view */}
        <DashboardCard
          title="View Lost Items"
          description="Browse reported lost items."
          onClick={() => navigate("/lost")}
        />
        <DashboardCard
          title="View Found Items"
          description="Browse reported found items."
          onClick={() => navigate("/found")}
        />

        {/* Only students */}
        {role === "student" && (
          <DashboardCard
            title="Change Password"
            description="Update your account password."
            onClick={() => navigate("/change-password")}
          />
        )}

      </div>
    </div>
  );
};

export default Dashboard;
