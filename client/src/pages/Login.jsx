import { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email.trim()) {
      setError("Please enter your email address.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("The email or password you entered is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <form
        onSubmit={submit}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border-4 border-pink-200"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
          Continue
        </h2>

        <p className="text-center text-gray-500 mb-4">
          Welcome back
        </p>

        {error && (
          <>
            <div
              className="mb-2 rounded-xl px-4 py-3 text-sm"
              style={{
                backgroundColor: "#fde2e7",
                color: "#9b1248",
                border: "1px solid #f3a4b7",
              }}
            >
              {error}
            </div>

            <p className="text-xs text-center text-gray-500 mb-4">
             Sign up if you haven't!
            </p>
          </>
        )}

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-xl border-2 border-pink-200"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl border-2 border-pink-200"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-lg transition"
            style={{
              background: loading
                ? "#f0a3b5"
                : "linear-gradient(to right, #ec4899, #f43f5e)",
              color: "#ffffff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </form>
    </div>
  );
}
