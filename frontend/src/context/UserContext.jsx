import { createContext, useState, useEffect, useContext } from "react";
import { api } from "../api/User";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setUser(res.data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.response?.data?.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.response?.data?.message };
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []); // <-- FIX

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        setLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
