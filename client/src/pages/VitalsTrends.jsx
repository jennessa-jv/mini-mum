import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {Link} from "react-router-dom"
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
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    api
      .get("/vitals/history")
      .then((res) => {
        const formatted = res.data.map((v) => ({
          date: new Date(v.createdAt).toLocaleDateString(),
          systolicBP: Number(v.systolicBP),
          diastolicBP: Math.max(40, Number(v.diastolicBP)),
          weight: Number(v.weight),
          bloodSugar: Number(v.bloodSugar),
          heartRate: Number(v.heartRate)
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
    return  <Link to="/dashboard" className="text-rose-300 underline">
          No vitals recorded yet. Back to Dashboard.
        </Link>;
  }

  return (
    <div>
      <Link to="/dashboard" className="text-sm text-pink-600 hover:underline">
        ← Back to Dashboard
      </Link>

      <h1 className="text-3xl font-bold text-pink-700 mb-8">
        📈 Health Trends
      </h1>

      <ChartBox title="Systolic Blood Pressure">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[80, 200]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="systolicBP"
            stroke="#ec4899"
            name="Systolic BP"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartBox>

      <ChartBox title="Diastolic Blood Pressure">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[40, 120]} />
          <Tooltip />
          <Legend />
          <Line
            dataKey="diastolicBP"
            stroke="#9333ea"
            name="Diastolic BP"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartBox>

      <ChartBox title="Weight (kg)">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="weight"
            stroke="#f97316"
            name="Weight"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartBox>

      <ChartBox title="Blood Sugar">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="bloodSugar"
            stroke="#22c55e"
            name="Blood Sugar"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ChartBox>

      <ChartBox title="Heart Rate">
        <LineChart width={700} height={300} data={vitals}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            dataKey="heartRate"
            stroke="#ef4444"
            name="Heart Rate"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
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
