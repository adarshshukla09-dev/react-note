import { createContext, useState, useContext } from "react";
import { api } from "../api/User";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const Register = async ({ name, email, password }) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      setUser(res.data.user);  // ✅ FIXED
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.response?.data?.message };
    }
  };

  const Login = async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user); // ✅ FIXED
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err.response?.data?.message };
    }
  };

  const logout = async () => {
    await api.get("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login: Login,       // exposed lowercase
        register: Register, // exposed lowercase
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
