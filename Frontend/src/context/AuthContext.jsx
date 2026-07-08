import { useEffect, createContext, useState } from "react";

import {
  login,
  register,
  logout,
  getMe,
} from "../features/auth/services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  async function handleGetMe() {
    setLoading(true);

    try {
      const data = await getMe();
      setUser(data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }

    useEffect(() => {
    handleGetMe();
  }, []);

  }

  return (
    <AuthContext.Provider value={{ user, setLoading, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
