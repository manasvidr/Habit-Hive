import apiClient from "./apiClient";

export const sendAIMessage = async (message) => {
  const res = await apiClient.post("/ai/coach", { message });
  return res.data.reply || res.data;
};
