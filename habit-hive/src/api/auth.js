import apiClient from "./apiClient";

// register new user
export const registerUser = async (name, email, password) => {
  const res = await apiClient.post("/auth/register", { name, email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

// login existing user
export const loginUser = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));
  return res.data.user;
};

// logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
