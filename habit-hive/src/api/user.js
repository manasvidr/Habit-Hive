import apiClient from "./apiClient";

// Get user profile
export const getUserProfile = async () => {
  const res = await apiClient.get("/users/profile");
  return res.data;
};

// Update user profile
export const updateUserProfile = async (data) => {
  const res = await apiClient.put("/users/profile", data);
  return res.data;
};
