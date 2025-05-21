import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      alert("Hyrja u krye me sukses!");
      navigate("/admin");
    } catch (err) {
      alert("Email ose fjalëkalim i pasaktë");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-pink-700">Hyr si Admin</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border p-2 rounded"
          type="password"
          placeholder="Fjalëkalimi"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 w-full"
          type="submit"
        >
          Hyr
        </button>
      </form>
    </div>
  );
};

export default Login;
