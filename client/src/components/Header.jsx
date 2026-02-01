import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showMascot, setShowMascot] = useState(true);
  const [waveOnce, setWaveOnce] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const hour = new Date().getHours();
  const isNight = hour >= 19 || hour <= 6;
  const mascot = isNight ? "🌙🧸" : "🧸";

  useEffect(() => {
    if (!localStorage.getItem("mascotWaved")) {
      setWaveOnce(true);
      localStorage.setItem("mascotWaved", "true");
      setTimeout(() => setWaveOnce(false), 2200);
    }
  }, []);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setShowMascot(current < lastScroll || current < 40);
      lastScroll = current;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      navigate("/login");
    }, 800);
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-pink-200 via-rose-300 to-fuchsia-200 text-rose-800 shadow-[0_6px_28px_rgba(244,114,182,0.3)]">
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative max-w-6xl mx-auto flex justify-between items-center px-4 py-4">

        <div className="flex items-center gap-3 relative">

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">🌸</span>
            <div>
              <h1 className="text-xl font-semibold tracking-wide">
                Maternal Quest
              </h1>
              <p className="text-[11px] text-rose-600">
                level up gently ✨
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {showMascot && (
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{
                  y: 0,
                  opacity: 1,
                  rotate: waveOnce ? [0, -12, 12, -6, 0] : 0
                }}
                exit={{ y: 16, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute -top-3 -right-7 select-none"
              >
                <span className="text-xl">{mascot}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated() && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isLoggingOut ? { x: [0, -6, 6, 0] } : {}}
              transition={{ duration: 0.6 }}
              onClick={handleLogout}
              className="bg-white/70 hover:bg-white text-rose-600 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur shadow-sm transition"
            >
              Exit
            </motion.button>
          )}

          {!isAuthenticated() && isLoginPage && (
            <Link
              to="/register"
              className="bg-white/70 hover:bg-white text-rose-600 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur shadow-sm transition"
            >
              Register
            </Link>
          )}

          {!isAuthenticated() && isRegisterPage && (
            <Link
              to="/login"
              className="bg-white/70 hover:bg-white text-rose-600 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur shadow-sm transition"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
