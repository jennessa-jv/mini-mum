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
      <div className="relative max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

        {/* Brand */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌸</span>
          <div>
            <h1 className="text-xl font-extrabold">Maternal Quest</h1>
            <p className="text-[11px] text-white/80">Level up your journey ✨</p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {isAuthenticated() && (
            <>
              <Link
                to="/safety-map"
                className="bg-white/20 px-3 py-1 rounded-full text-xs"
              >
                🌍 Safety Map
              </Link>

              <button
                onClick={handleLogout}
                className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold"
              >
                Exit
              </button>
            </>
          )}

          {!isAuthenticated() && isLoginPage && (
            <Link
              to="/register"
              className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              Register
            </Link>
          )}

          {!isAuthenticated() && isRegisterPage && (
            <Link
              to="/login"
              className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-sm font-semibold"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
