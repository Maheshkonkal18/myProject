// client/src/App.jsx
import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import LostForm from "./pages/LostForm.jsx";
import FoundForm from "./pages/FoundForm.jsx";
import LostList from "./pages/LostList.jsx";
import FoundList from "./pages/FoundList.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import { useAuth } from "./components/AuthContext.jsx";

const RequireAuth = ({ children }) => {
  const { token } = useAuth();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-1 pb-8">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/lost/new"
            element={
              <RequireAuth>
                <LostForm />
              </RequireAuth>
            }
          />
          <Route
            path="/found/new"
            element={
              <RequireAuth>
                <FoundForm />
              </RequireAuth>
            }
          />
          <Route
            path="/lost"
            element={
              <RequireAuth>
                <LostList />
              </RequireAuth>
            }
          />
          <Route
            path="/found"
            element={
              <RequireAuth>
                <FoundList />
              </RequireAuth>
            }
          />
          <Route
            path="/change-password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
