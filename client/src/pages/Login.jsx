import { useState, useEffect } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.style.background = "#FADADD";
    document.documentElement.style.overflowX = "hidden";
    document.body.style.background = "#FADADD";
    document.body.style.overflowX = "hidden";
    document.body.style.margin = "0";

    const move = (e) => {
      const dot = document.createElement("div");
      dot.style.position = "fixed";
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
      dot.style.width = "6px";
      dot.style.height = "6px";
      dot.style.borderRadius = "50%";
      dot.style.background = "rgba(255,255,255,0.9)";
      dot.style.pointerEvents = "none";
      dot.style.zIndex = 30;
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 500);
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

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
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError("The email or password you entered is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute inset-0 max-w-full"
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(120deg, #FBCFE8, #F9A8D4, #FECACA)",
          backgroundSize: "200% 200%",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
              opacity: 0.7,
            }}
            animate={{ y: [0, -25, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{
              duration: Math.random() * 4 + 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💗
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-20 flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="text-7xl"
            >
              🧸
            </motion.div>
            <p className="mt-4 text-white text-xl font-semibold">
              Login successful!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="relative z-10 bg-white/95 w-full max-w-md rounded-3xl shadow-xl p-10"
      >
        <h2 className="text-4xl font-extrabold text-center mb-1 text-[#E8799D]">
          Welcome back
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to continue
        </p>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 rounded-xl px-4 py-3 text-sm text-center"
              style={{
                backgroundColor: "#FDECEF",
                color: "#9D3E55",
                border: "1px solid #F5B7C7",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-5">
          <input
            className="w-full p-4 rounded-xl border-2 focus:outline-none"
            style={{ borderColor: "#F5B7C7" }}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-4 rounded-xl border-2 focus:outline-none"
            style={{ borderColor: "#F5B7C7" }}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            disabled={loading}
            whileHover={!loading ? { scale: 1.04 } : {}}
            whileTap={!loading ? { scale: 0.96 } : {}}
            className="w-full py-4 rounded-xl font-semibold text-lg"
            style={{
              background: loading
                ? "#FBCFE8"
                : "linear-gradient(to right, #F472B6, #FB7185)",
              color: "#ffffff",
            }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
