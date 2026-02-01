import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MaternalHealth from "./pages/MaternalHealth";
import PeriodCorner from "./pages/PeriodCorner";
import SafetyMap from "./pages/SafetyMap";
import Header from "./components/Header";
import PrivateRoute from "./PrivateRoute";
import { isAuthenticated } from "./services/auth";
import VitalsTrends from "./pages/VitalsTrends";
import CancerPrediction from "./pages/CancerPrediction";
import NearbyDoctors from "./pages/NearbyDoctos";
export default function App() {
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-4">
        <Routes>
   
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

         
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
<Route
  path="/health-trends"
  element={
    <PrivateRoute>
      <VitalsTrends />
    </PrivateRoute>
  }
/>

          <Route
            path="/safety-map"
            element={
              <PrivateRoute>
                <SafetyMap />
              </PrivateRoute>
            }
          />

          <Route
            path="/period-corner"
            element={
              <PrivateRoute>
                <PeriodCorner />
              </PrivateRoute>
            }
          />

          <Route
            path="/maternal-health"
            element={
              <PrivateRoute>
                <MaternalHealth />
              </PrivateRoute>
            }
          />
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
          <Route
            path="/cancer-prediction"
            element={
              <PrivateRoute>
               {<CancerPrediction />}
              </PrivateRoute>
            }
          />
          

<Route
  path="/doctors"
  element={
    <PrivateRoute>
      <NearbyDoctors />
    </PrivateRoute>
  }
/>


  
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}
