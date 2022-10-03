import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  useEffect(() => {
    try {
      localStorage.setItem("token", JSON.stringify(token));
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, [token]);

  const contextValue = {
    token,
    login(token) {
      setToken(token);
    },
    logout() {
      setToken(null);
    },
    isLogged() {
      return !!token;
    },
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;