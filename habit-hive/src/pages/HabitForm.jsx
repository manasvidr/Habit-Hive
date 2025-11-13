import { useState } from "react";
import { addHabit } from "../api/habits";
import { useNavigate } from "react-router-dom";

export default function HabitForm() {
  const [form, setForm] = useState({ title: "", goal: "", unit: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const title = form.title.trim();
    const goal = Number(form.goal);
    const unit = form.unit.trim();

    if (!title) return setError("Please enter a habit name.");
    if (!goal || goal <= 0)
      return setError("Goal must be a positive number.");

    setLoading(true);
    try {
      await addHabit({ title, goal, unit });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Failed to add habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ color: "white" }}>
      {/* Header matches Dashboard */}
      <div className="app-header" style={{ marginBottom: "2rem" }}>
        <div className="brand">
          <img
            src="/pinkbee.jpeg"
            alt="Habit Hive logo"
            className="logo-img"
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: 16,
            }}
          />

          <div>
            <div className="h1">Add Habit</div>
            <div className="muted">Build something amazing today 🐝</div>
          </div>
        </div>

        <div className="nav-links">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn small"
            style={{ color: "black" }}
          >
            Back
          </button>
        </div>
      </div>

      {/* Centered form card */}
      <div
        className="card"
        style={{
          maxWidth: 500,
          margin: "0 auto",
          padding: "2rem",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "16px",
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Habit Name"
            value={form.title}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />

          <input
            name="goal"
            type="number"
            min="1"
            placeholder="Goal (e.g. 5)"
            value={form.goal}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />

          <input
            name="unit"
            placeholder="Unit (e.g. glasses, pages)"
            value={form.unit}
            onChange={handleChange}
            className="p-2 rounded text-black"
          />

          {/* pastel button like your UI */}
          <button
            type="submit"
            disabled={loading}
            className="btn"
            style={{
              background: "linear-gradient(90deg,#ffd1f2,#d9d3ff)",
              color: "black",
              fontWeight: "600",
              padding: "10px",
              borderRadius: 8,
              marginTop: "10px",
            }}
          >
            {loading ? "Adding…" : "Add Habit"}
          </button>

          {error && (
            <div style={{ color: "crimson", marginTop: 6 }}>{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}
