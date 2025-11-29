import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

const Header = () => {
  const { role, student, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            VVCE Lost &amp; Found
          </h1>
          <p className="text-xs text-gray-500">Connecting Students</p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          {role && (
            <Link className="text-gray-600 hover:text-gray-900" to="/">
              Dashboard
            </Link>
          )}
          {role === "student" && (
            <Link
              className="text-gray-600 hover:text-gray-900"
              to="/change-password"
            >
              Change Password
            </Link>
          )}
          {!role && (
            <Link className="text-gray-600 hover:text-gray-900" to="/login">
              Login
            </Link>
          )}
          {role && (
            <>
              <span className="text-gray-500 text-xs">
                {role === "admin"
                  ? "Admin"
                  : `${student?.name} (${student?.usn})`}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1 border border-gray-300 rounded text-gray-700 text-xs hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
