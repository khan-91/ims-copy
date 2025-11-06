import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("pos-user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem("pos-token") || null);

  useEffect(() => {
    if (user) localStorage.setItem("pos-user", JSON.stringify(user));
    else localStorage.removeItem("pos-user");

    if (token) localStorage.setItem("pos-token", token);
    else localStorage.removeItem("pos-token");
  }, [user, token]);

  const signin = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
