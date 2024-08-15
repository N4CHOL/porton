// context/AuthContext.js
// eslint-disable-next-line no-unused-vars
import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/AuthService';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = localStorage.getItem("user");
    return !!user;
  });

  const login = async (username, password, navigate) => {
    try {
      await authService.login(username, password, navigate);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login error:", error);
    }
  };


  const logout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);