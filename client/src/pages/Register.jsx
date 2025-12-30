import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/login");
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-10 bg-white p-6">
      <h2 className="text-xl mb-4">Register</h2>

      <input
        className="w-full mb-3 p-2 border"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full mb-3 p-2 border"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="w-full bg-pink-600 text-white p-2">
        Register
      </button>
    </form>
  );
}
