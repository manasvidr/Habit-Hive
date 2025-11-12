import { useState } from "react";
import { addHabit } from "../api/habits";
import { useNavigate } from "react-router-dom";

export default function HabitForm() {
  const [form, setForm] = useState({ title: "", goal: "", unit: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await addHabit(form.title, form.goal, form.unit);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Add New Habit</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="title" placeholder="Habit Name" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="goal" placeholder="Goal (e.g. 5)" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="unit" placeholder="Unit (e.g. glasses, pages)" onChange={handleChange} className="p-2 rounded text-black" />
        <button className="bg-yellow-400 text-black font-semibold p-2 rounded">Add</button>
      </form>
    </div>
  );
}
