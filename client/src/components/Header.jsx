import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated, logout } from "../services/auth";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-lg">
      
      {/* ✨ Sparkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-3 left-10 w-2 h-2 bg-white/40 rounded-full animate-ping" />
        <div className="absolute top-5 right-16 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
      </div>

      {/* ⬇️ thickness control here */}
      <div className="relative max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        
        {/* 🌸 Brand */}
        <div className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">
            🌸
          </span>

          <div>
            <h1
              style={{ fontFamily: "'Baloo 2', cursive" }}
              className="text-xl font-extrabold tracking-wide leading-tight"
            >
              Maternal Quest
            </h1>

            <p
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="text-[11px] text-white/80 leading-none"
            >
              Level up your journey ✨
            </p>
          </div>
        </div>

        {/* 👉 Right Side */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated() && (
            <>
              <span className="text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 shadow font-semibold">
                Level 1 🤰
              </span>

              <button
                onClick={handleLogout}
                className="relative bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold overflow-hidden group"
              >
                <span className="relative z-10">Exit</span>
                <span className="absolute inset-0 bg-pink-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            </>
          )}

          {!isAuthenticated() && isLoginPage && (
            <Link
              to="/register"
              className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
            >
              Register
            </Link>
          )}

          {!isAuthenticated() && isRegisterPage && (
            <Link
              to="/login"
              className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold shadow hover:scale-105 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
