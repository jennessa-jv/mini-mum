import { useEffect, useState } from "react";
import api from "../services/api";
import CalendarView from "../components/CalendarView";
import { Link } from "react-router-dom";

export default function PeriodCorner() {
  const [startDate, setStartDate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [periods, setPeriods] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchPrediction = async () => {
    try {
      const res = await api.get("/period/predict");
      setPrediction(res.data);
      setError("");
    } catch {
      setPrediction(null);
      setError("Add at least 2 cycles to enable predictions");
    }
  };

const fetchPeriods = async () => {
  setLoading(true);
  const res = await api.get("/period/history");
  setPeriods(res.data);
  setLoading(false);
};
  

  const submitPeriod = async (e) => {
    e.preventDefault();
    if (!startDate) return;

    await api.post("/period", { startDate });
    setStartDate(""); //this is what clears the input field after setting and saving the date
    fetchPeriods();
    fetchPrediction();
  };

  useEffect(() => {
    fetchPeriods();
    fetchPrediction();
  }, []);

  return (

    <div>
       
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌸 Period Corner
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-200">
        <h2 className="text-xl font-bold text-pink-700 mb-4">
          🩸 Cycle Tracking
        </h2>

        <form onSubmit={submitPeriod} className="flex gap-4 mb-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <button className="bg-pink-600 text-white px-4 rounded-lg">
            Save
          </button>
        </form>

        {loading ? (
  <p className="text-sm text-gray-400">Loading periods...</p>
) : periods.length > 0 ? (
  <div className="mb-4">
    <p className="text-sm font-semibold text-pink-600 mb-2">
      Logged Periods
    </p>
    <ul className="space-y-1 text-sm text-gray-700">
      {periods.map((p) => (
        <li key={p._id} className="bg-pink-50 px-3 py-1 rounded-lg">
          {new Date(p.startDate).toDateString()}
        </li>
      ))}
    </ul>
  </div>
) : (
  <p className="text-sm text-gray-400">No periods logged yet</p>
)}

        <CalendarView
          periods={periods}
          predictedDate={prediction?.predictedNextPeriod}
        />

        {prediction && (
          <div className="mt-4 bg-pink-50 rounded-xl p-4">
            <p className="text-gray-700">
              📅 Next Expected Period:
              <span className="font-semibold ml-2">
                {new Date(
                  prediction.predictedNextPeriod
                ).toDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Learned Cycle Length: {prediction.learnedCycle} days
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        )}
       
      </div>
       <Link
        to="/dashboard"
        className="text-sm text-pink-600 hover:underline"
      >
        ← Back to Dashboard
      </Link>
    </div>
  );
}
