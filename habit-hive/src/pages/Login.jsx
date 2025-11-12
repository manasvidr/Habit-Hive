import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const user = await loginUser(form.email, form.password);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="email" placeholder="Email" onChange={handleChange} className="p-2 rounded text-black" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 rounded text-black" />
        <button className="bg-yellow-400 text-black font-semibold p-2 rounded">Login</button>
      </form>
    </div>
  );
}
