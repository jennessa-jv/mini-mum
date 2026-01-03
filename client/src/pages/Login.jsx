import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border-4 border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          🔁 Continue Quest
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Welcome back, hero
        </p>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-xl border-2 border-pink-200"
            placeholder="Email Scroll 📜"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl border-2 border-pink-200"
            type="password"
            placeholder="Secret Spell 🔐"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl font-bold text-lg hover:scale-[1.02] transition">
            ▶ Enter World
          </button>
        </div>
      </form>
    </div>
  );
}
