import React, { useState } from "react";
import api from "../api.js";
import { useAuth } from "../components/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const getStrength = (pwd) => {
  let score = 0;
  if (pwd.length >= 6) score++;
  if (pwd.length >= 10) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (!pwd) return { label: "", color: "" };
  if (score <= 2) return { label: "Weak", color: "text-red-600" };
  if (score <= 3) return { label: "Medium", color: "text-yellow-600" };
  return { label: "Strong", color: "text-green-600" };
};

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const strength = getStrength(newPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirm) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password should be at least 6 characters.");
      return;
    }

    try {
      const res = await api.post("/auth/change-password", {
        currentPassword,
        newPassword
      });
      setSuccess(res.data.message || "Password changed successfully.");
      // Require re-login
      setTimeout(() => {
        logout();
        navigate("/login");
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to change password. Try again."
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 px-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Change Password
      </h2>
      {error && (
        <div className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}
      {success && (
        <div className="text-xs text-green-700 mb-3 bg-green-50 border border-green-200 rounded p-2">
          {success}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="space-y-3 text-sm bg-white p-4 border border-gray-200 rounded-lg"
      >
        <div>
          <label className="block text-gray-700 mb-1">Current Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">New Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {strength.label && (
            <p className={`mt-1 text-xs ${strength.color}`}>
              Strength: {strength.label}
            </p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-2 py-1"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-2 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
