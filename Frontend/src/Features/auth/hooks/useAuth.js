import { login, register, logout, getMe } from "../services/auth.api";

import { use, useContext } from "react";

import { AuthContext } from "../auth.context";

export const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  async function handleRegister(username, email, password) {
    setLoading(true);

    const data = await register(username, email, password);
    setUser(data.user);

    setLoading(false);
  }

  async function handleLogin(username, email, password) {
    setLoading(true);

    const data = await login(username, email, password);
    setUser(data.user);

    setLoading(false);
  }

  async function handleGetMe() {
    setLoading(true);
    const data = await getMe();
    setUser(data.user);

    setLoading(false);
  }


  async function handleLogOut() {
    setLoading(True)
    const data  = await logout()

    setLoading(false)
  }
};
