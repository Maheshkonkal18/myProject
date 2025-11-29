import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const [student, setStudent] = useState(() => {
    const stored = localStorage.getItem("student");
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (role) localStorage.setItem("role", role);
    else localStorage.removeItem("role");
  }, [role]);

  useEffect(() => {
    if (student) localStorage.setItem("student", JSON.stringify(student));
    else localStorage.removeItem("student");
  }, [student]);

  const login = (data) => {
    setToken(data.token);
    setRole(data.role);
    if (data.role === "student") {
      setStudent({ name: data.name, usn: data.usn });
    } else {
      setStudent(null);
    }
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, student, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
