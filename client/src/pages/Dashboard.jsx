import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌼 Dashboard
      </h1>


      <button
        onClick={() => navigate("/safety-map")}
        className="bg-pink-600 text-pink px-4 py-2 rounded mb-6"
      >
        🌍 View Safety Map
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-200">
          <h2 className="text-xl font-bold text-pink-700 mb-2">
            🌸 Period Corner
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Track cycles, view predictions, and get insights.
          </p>
          <Link
            to="/period-corner"
            className="inline-block bg-pink-600 text-white px-4 py-2 rounded-lg"
          >
            Go to Period Corner →
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-100">
  <h2 className="text-xl font-bold text-pink-600 mb-2">
    🩺 Health Overview
  </h2>
  <p className="text-sm text-gray-500 mb-4">
    View vitals history and health trends.
  </p>

  <button
    onClick={() => navigate("/health-trends")}
    className="bg-pink-600 text-white px-4 py-2 rounded-lg"
  >
    View Health Trends →
  </button>
</div>
<div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-rose-200">
  <h2 className="text-xl font-bold text-rose-600 mb-2">
    🧬 The leading cancer</h2>
  <p className="text-sm text-gray-600 mb-4">
    Breast Cancer - a review on the bane of a mammal's existance
  </p>

  <button
    onClick={() => navigate("/cancer-prediction")}
    className="bg-rose-600 text-white px-4 py-2 rounded-lg"
  >
    Start Prediction →
  </button>
</div>
<button
  onClick={() => navigate("/doctors")}
  className="
    flex items-center gap-2
    bg-pink-500 text-white
    px-6 py-3
    rounded-xl
    font-medium
    shadow-md
    transition-all duration-200
    hover:bg-pink-600 hover:shadow-lg
    active:scale-[0.98]
  "
>
  🩺 Find Nearby Doctors
</button>
      </div>
    </div>
  );
}
