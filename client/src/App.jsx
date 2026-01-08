import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
// import VitalsForm from "./pages/VitalsForm";
import Header from "./components/Header";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "./services/auth";
import PeriodCorner from "./pages/PeriodCorner";

export default function App() {
  return (
    <>
      {/* Show Header only if logged in */}
       <Header />

      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/vitals"
            element={
              <PrivateRoute>
                <VitalsForm />
              </PrivateRoute>
            }
          /> */}

          {/* Root route */}
          <Route
            path="/"
            element={
              isAuthenticated() ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          import PeriodCorner from "./pages/PeriodCorner";

<Route
  path="/period-corner"
  element={
    <PrivateRoute>
      <PeriodCorner />
    </PrivateRoute>
  }
/>


          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
