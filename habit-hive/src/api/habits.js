import apiClient from "./apiClient";

// get all habits
export const getHabits = async () => {
  const res = await apiClient.get("/habits");
  return res.data;
};

// add a new habit
export const addHabit = async (title, goal, unit) => {
  const res = await apiClient.post("/habits", { title, goal, unit });
  return res.data;
};

// delete habit
export const deleteHabit = async (id) => {
  const res = await apiClient.delete(`/habits/${id}`);
  return res.data;
};

// increment habit progress
export const incrementHabit = async (id, amount) => {
  const res = await apiClient.put(`/habits/${id}/increment`, { amount });
  return res.data;
};

// decrement habit progress
export const decrementHabit = async (id, amount) => {
  const res = await apiClient.put(`/habits/${id}/decrement`, { amount });
  return res.data;
};

// get weekly analytics
export const getAnalyticsOverview = async () => {
  const res = await apiClient.get("/analytics/overview");
  return res.data;
};

// get individual habit weekly data
export const getHabitWeekly = async (habitId) => {
  const res = await apiClient.get(`/analytics/${habitId}`);
  return res.data;
};
