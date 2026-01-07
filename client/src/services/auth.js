import api from "./api";

export const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
};

export const register = async (name, email, password) => {
  const res = await api.post("/auth/register", { name, email, password });
  localStorage.setItem("token", res.data.token);
  return res.data;
};
export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () =>
  Boolean(localStorage.getItem("token"));


