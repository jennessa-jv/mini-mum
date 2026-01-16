import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function VitalsTrends() {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // 👈 add this

  const goBack = () => {
    navigate("/dashboard"); // 👈 change path if needed
  };

  useEffect(() => {
    api
      .get("/vitals/history")
      .then((res) => {
        const formatted = res.data.map((v) => ({
          date: new Date(v.createdAt).toLocaleDateString(),
          systolicBP: v.systolicBP,
          diastolicBP: v.diastolicBP,
          weight: v.weight,
          bloodSugar: v.bloodSugar,
          heartRate: v.heartRate
        }));
        setVitals(formatted);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading health trends…</p>;
  }

  if (!vitals.length) {
    return <p className="text-gray-500">No vitals recorded yet.</p>;
  }

  return (
    <div>
      {/* 🔙 BACK BUTTON */}
      <button
        onClick={goBack}
        className="mb-6 px-4 py-2 rounded-lg bg-pink-500 text-white font-semibold hover:bg-pink-600 transition"
      >
        ← Back to Dashboard
      </button>

      <h1 className="text-3xl font-bold text-pink-700 mb-8">
        📈 Health Trends
      </h1>

      <ChartBox title="Blood Pressure">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="systolicBP" stroke="#ec4899" name="Systolic" />
          <Line dataKey="diastolicBP" stroke="#9333ea" name="Diastolic" />
        </LineChart>
      </ChartBox>

      <ChartBox title="Weight (kg)">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="weight" stroke="#f97316" />
        </LineChart>
      </ChartBox>

      <ChartBox title="Blood Sugar">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="bloodSugar" stroke="#22c55e" />
        </LineChart>
      </ChartBox>

      <ChartBox title="Heart Rate">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line dataKey="heartRate" stroke="#ef4444" />
        </LineChart>
      </ChartBox>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-4 border-pink-100 overflow-x-auto">
      <h2 className="text-xl font-bold text-pink-600 mb-4">
        {title}
      </h2>
      {children}
    </div>
  );
}
