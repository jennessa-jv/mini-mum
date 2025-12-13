import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import VitalsForm from './pages/VitalsForm'
import Header from './components/Header'
import { getToken } from './services/auth'

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute><Dashboard /></PrivateRoute>
          } />
          <Route path="/vitals" element={
            <PrivateRoute><VitalsForm /></PrivateRoute>
          } />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </>
  )
}
