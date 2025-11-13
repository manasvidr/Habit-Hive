// src/api/habits.js
import apiClient from "./apiClient";

/**
 * addHabit(payloadOrTitle, goal, unit)
 * Accepts either an object {title, goal, unit} or (title, goal, unit) args
 */
export async function addHabit(payloadOrTitle, maybeGoal, maybeUnit) {
  const payload =
    typeof payloadOrTitle === "object"
      ? payloadOrTitle
      : { title: payloadOrTitle, goal: maybeGoal, unit: maybeUnit };

  // ensure numeric goal
  payload.goal = Number(payload.goal) || 0;

  if (apiClient) {
    const res = await apiClient.post("/habits", payload);
    return res.data;
  } else {
    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || ""}/api/habits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || body?.error || "Failed to add habit");
    }
    return res.json();
  }
}
