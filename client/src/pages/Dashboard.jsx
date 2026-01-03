export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌸 Your Journey
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Stats Card */}
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
          <p className="text-sm text-gray-500 mt-1">XP Progress</p>
        </div>

        {/* Risk Card */}
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
    </div>
  );
}
