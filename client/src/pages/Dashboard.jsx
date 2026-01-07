import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [startDate, setStartDate] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");
  const [periods, setPeriods] = useState([]);


  const fetchPrediction = async () => {
    try {
      const res = await api.get("/period/predict");
      setPrediction(res.data);
      setError("");
    } catch {
      setError("Add at least 2 cycles to enable predictions");
    }
  };
  const fetchPeriods = async () => {
  const res = await api.get("/period/history");
  setPeriods(res.data);
};


  const submitPeriod = async (e) => {
    e.preventDefault();
    if (!startDate) return;

    await api.post("/period", { startDate });
    setStartDate("");
    fetchPrediction();
  };

  useEffect(() => {
    fetchPrediction();
  }, []);
useEffect(() => {
  fetchPrediction();
  fetchPeriods();
}, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌸 Your Journey
      </h1>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-100">
          <h2 className="text-xl font-bold text-pink-600 mb-4">
            🫀 Health Stats
          </h2>

          <div className="space-y-2 text-gray-700">
            <p>❤️ Blood Pressure: hello</p>
            <p>⚖️ Weight: hi</p>
          </div>

          <div className="mt-4 bg-pink-100 rounded-full h-3">
            <div className="bg-pink-500 h-3 rounded-full w-3/4"></div>
          </div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-6 border-4 border-rose-200">
          <h2 className="text-xl font-bold text-rose-600 mb-4">
            👾 Risk Encounter
          </h2>

          <p className="text-gray-700">
            Risk Level: <span className="font-semibold">None</span>
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Status: Strong & stable 💪
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-200">
        <h2 className="text-xl font-bold text-pink-700 mb-4">
          🩸 Period Predictor
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

        {prediction && (
          <div className="bg-pink-50 rounded-xl p-4">
            <p className="text-gray-700">
              📅 Next Period:
              <span className="font-semibold ml-2">
                {new Date(
                  prediction.predictedNextPeriod
                ).toDateString()}
              </span>
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Learned Cycle: {prediction.learnedCycle} days
            </p>
          </div>
        )}

        {error && (
          <p className="text-sm text-gray-500 mt-2">{error}</p>
        )}
      </div>
    </div>
  );
}
