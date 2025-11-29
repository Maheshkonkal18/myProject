import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { useAuth } from "../components/AuthContext.jsx";

const Login = () => {
  const [mode, setMode] = useState("student"); // 'student' or 'admin'
  const [name, setName] = useState("");
  const [usn, setUsn] = useState("");
  const [password, setPassword] = useState("");
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let body;
      if (mode === "admin") {
        body = {
          admin: true,
          username: adminUser,
          password: adminPass
        };
      } else {
        body = { name, usn, password };
      }

      const res = await api.post("/auth/login", body);
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please check details."
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="bg-white border border-gray-200 rounded-lg p-6 w-full max-w-md">
        <div className="flex mb-4 text-sm border-b border-gray-200">
          <button
            className={`flex-1 py-2 ${
              mode === "student"
                ? "border-b-2 border-gray-800 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setMode("student")}
          >
            Student Login
          </button>
          <button
            className={`flex-1 py-2 ${
              mode === "admin"
                ? "border-b-2 border-gray-800 font-medium"
                : "text-gray-500"
            }`}
            onClick={() => setMode("admin")}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <div className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 rounded p-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          {mode === "student" ? (
            <>
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">USN</label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm uppercase"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="mt-1 text-xs text-gray-400">
                  Initial password is the shared default provided by admin.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-gray-700 mb-1">Admin User</label>
                <input
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-gray-800 text-white py-2 rounded text-sm hover:bg-gray-900"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
