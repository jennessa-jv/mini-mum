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
    <header className="bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌸</span>
          <h1 className="text-xl font-bold tracking-wide">
            Maternal Quest
          </h1>
        </div>

        {/* Right Side */}
        <div>
          {/* Authenticated (Dashboard) */}
          {isAuthenticated() && (
            <div className="flex items-center gap-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                Level 1 🤰
              </span>
              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-4 py-1 rounded-full font-semibold hover:bg-pink-100 transition"
              >
                Exit
              </button>
            </div>
          )}

          {/* Login Page → Show Register */}
          {!isAuthenticated() && isLoginPage && (
            <Link
              to="/register"
              className="bg-white text-pink-600 px-4 py-1 rounded-full font-semibold hover:bg-pink-100 transition"
            >
              Register
            </Link>
          )}

          {/* Register Page → Show Login */}
          {!isAuthenticated() && isRegisterPage && (
            <Link
              to="/login"
              className="bg-white text-pink-600 px-4 py-1 rounded-full font-semibold hover:bg-pink-100 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
