import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await registerUser(form.name, form.email, form.password);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 rounded text-black" />
        <button className="bg-yellow-400 text-black font-semibold p-2 rounded">Register</button>
      </form>
    </div>
  );
}
