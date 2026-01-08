export default function CalendarView({ periods, predictedDate }) {
  const baseDate =
    periods.length > 0
      ? new Date(periods[periods.length - 1].startDate)
      : new Date();

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-pink-600 mb-2">
        Cycle Calendar —{" "}
        {baseDate.toLocaleString("default", { month: "long" })} {year}
      </p>

      {/* WEEK LABELS */}
      <div className="grid grid-cols-7 text-xs text-gray-500 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold">
            {day}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-2 text-sm">
        {/* EMPTY CELLS BEFORE DAY 1 */}
        {[...Array(firstDayOfMonth)].map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* DAYS */}
        {[...Array(daysInMonth)].map((_, i) => {
          const date = new Date(year, month, i + 1);

          const isPeriod = periods.some((p) =>
            isSameDay(new Date(p.startDate), date)
          );

          const isPrediction =
            predictedDate &&
            isSameDay(new Date(predictedDate), date);

          return (
            <div
              key={i}
              className={`h-9 flex items-center justify-center rounded-lg
                ${
                  isPeriod
                    ? "bg-pink-500 text-white"
                    : isPrediction
                    ? "bg-pink-200"
                    : "bg-gray-100"
                }`}
            >
              {i + 1}
            </div>
          );
        })}
      </div>

      {/* LEGEND */}
      <div className="flex gap-4 text-xs mt-3">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-500 rounded"></span>
          Period
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-pink-200 rounded"></span>
          Predicted
        </div>
      </div>
    </div>
  );
}
