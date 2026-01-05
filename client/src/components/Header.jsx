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
    <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-xl">
      
      {/* ✨ Sparkle Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 left-10 w-2 h-2 bg-white/40 rounded-full animate-ping" />
        <div className="absolute top-8 right-16 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" />
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-white/30 rounded-full animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto flex justify-between items-center p-4">
        
        {/* 🌸 Logo / Title */}
        <div className="flex items-center gap-3 group">
          <span className="text-3xl transition-transform duration-300 group-hover:rotate-12">
            🌸
          </span>

          <div>
            <h1 className="text-xl font-extrabold tracking-wide">
              Mini-mum
            </h1>
            <p className="text-xs text-white/80">
              Level up your journey ✨
            </p>
          </div>
        </div>

        {/* 👉 Right Side */}
        <div className="flex items-center gap-4">
          
          {/* 🏆 Authenticated */}
          {isAuthenticated() && (
            <>
              <span className="text-sm bg-white/20 backdrop-blur-md px-4 py-1 rounded-full border border-white/30 shadow">
                Level 1 🤰
              </span>

              <button
                onClick={handleLogout}
                className="relative bg-white text-pink-600 px-5 py-1.5 rounded-full font-semibold overflow-hidden group"
              >
                <span className="relative z-10">Exit</span>
                <span className="absolute inset-0 bg-pink-100 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </button>
            </>
          )}

          {/* 🔁 Login / Register Swap */}
          {!isAuthenticated() && isLoginPage && (
            <Link
              to="/register"
              className="bg-white text-pink-600 px-5 py-1.5 rounded-full font-semibold shadow hover:scale-105 transition"
            >
              Register
            </Link>
          )}

          {!isAuthenticated() && isRegisterPage && (
            <Link
              to="/login"
              className="bg-white text-pink-600 px-5 py-1.5 rounded-full font-semibold shadow hover:scale-105 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
