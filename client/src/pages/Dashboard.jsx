import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌼 Dashboard
      </h1>

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
          <p className="text-sm text-gray-500">
            More insights coming soon…
          </p>
        </div>
      </div>
    </div>
  );
}
