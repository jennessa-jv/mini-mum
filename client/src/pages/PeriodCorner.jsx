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
  const [warning, setWarning] = useState("");

  const checkShortCycles = (data) => {
    if (data.length < 2) {
      setWarning("");
      return;
    }

    const sorted = [...data].sort(
      (a, b) => new Date(a.startDate) - new Date(b.startDate)
    );

    const last = new Date(sorted[sorted.length - 1].startDate);
    const prev = new Date(sorted[sorted.length - 2].startDate);

    const diff = (last - prev) / (1000 * 60 * 60 * 24);

    if (diff < 15) {
      setWarning(
        "⚠️ Your last cycle was very short. Please do consider consulting a medical proffessional. Repeated short cycles may need medical attention."
      );
    } else {
      setWarning("");
    }
  };

  const fetchPeriods = async () => {
    try {
      const res = await api.get("/period/history");
      setPeriods(res.data);
      checkShortCycles(res.data);
    } finally {
      setLoading(false);
    }
  };

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

  const submitPeriod = async (e) => {
    e.preventDefault();
    if (!startDate) return;

    try {
      await api.post("/period", { startDate });
      setStartDate("");
      setLoading(true);
      fetchPeriods();
      fetchPrediction();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to save period");
    }
  };

  const deletePeriod = async (id) => {
    if (!window.confirm("Delete this period?")) return;
    await api.delete(`/period/${id}`);
    setLoading(true);
    fetchPeriods();
    fetchPrediction();
  };

  useEffect(() => {
    fetchPeriods();
    fetchPrediction();
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
       <Link to="/dashboard" className="text-sm text-pink-600 hover:underline">
        ← Back to Dashboard
      </Link>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🌸 Period Corner
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-6 border-4 border-pink-200 mb-10">
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
          <ul className="space-y-2 mb-4">
            {periods.map((p) => (
              <li
                key={p._id}
                className="bg-pink-50 px-4 py-2 rounded-lg flex justify-between items-center"
              >
                <span>{new Date(p.startDate).toDateString()}</span>
                <button
                  onClick={() => deletePeriod(p._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-400 mb-4">
            No periods logged yet
          </p>
        )}

        {warning && (
          <div className="mb-4 bg-yellow-50 border border-yellow-300 text-yellow-800 text-sm rounded-lg p-3">
            {warning}
          </div>
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
                {new Date(prediction.predictedNextPeriod).toDateString()}
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

      <Section title="What Is a Period (Menses)?">
        <p>
          Menstruation is the monthly shedding of the uterine lining when
          pregnancy does not occur. Blood and tissue leave the body through
          the vagina.
        </p>
        <p>
          Periods usually last 3–7 days and may include cramps, bloating,
          fatigue, and mood changes.
        </p>
        <a
          href="https://teenbook.in/menstruation-a-handy-guide-to-periods/?gad_source=1&gad_campaignid=22830972201&gbraid=0AAAAACvFRpfIsvPJ3bnPcs3GK4sTiX6QS&gclid=Cj0KCQiA7fbLBhDJARIsAOAqhse4QxX1bb-4sycwl6nxwbEycqfApSGzrOUq3Q5I62s2X7tcLmefFowaAglwEALw_wcB"
          target="_blank"
          rel="noreferrer"
          className="text-pink-600 underline text-sm"
        >
          Learn more 
        </a>
      </Section>

      <Section title="Menopause">
        <p>
          Menopause marks the end of menstrual cycles and is diagnosed after
          12 months without a period.
        </p>
        <p>
          Hormonal changes during this time can affect sleep, mood, and body
          temperature.
        </p>
        <a
          href="https://my.clevelandclinic.org/health/diseases/21841-menopause"
          target="_blank"
          rel="noreferrer"
          className="text-pink-600 underline text-sm"
        >
          Menopause overview (cleveland clinic)
        </a>
      </Section>

      <Section title="Period Products">
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Pads">
            <p>
              Pads absorb menstrual flow externally and are ideal for beginners
              or heavy flow days.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Menstrual_pad"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              How pads work
            </a>
          </Card>

          <Card title="Tampons">
            <p>
              Tampons are inserted into the vagina and allow greater mobility.
              They must be changed regularly.
            </p>
            <a
              href="https://www.fda.gov/consumers/consumer-updates/facts-tampons-and-how-use-them-safely"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              Tampon safety (FDA)
            </a>
          </Card>

          <Card title="Menstrual Cups">
            <p>
              Menstrual cups collect blood internally and are reusable,
              cost-effective, and eco-friendly.
            </p>
            <a
              href="https://en.wikipedia.org/wiki/Menstrual_cup"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              Menstrual cup guide
            </a>
          </Card>
        </div>
      </Section>

      <Section title="How to Use Period Products">
        <div className="grid md:grid-cols-3 gap-4">
          <Card title="Pads Tutorial">
            <ol className="list-decimal ml-4">
              <li>Remove backing</li>
              <li>Stick to underwear center(using the wings)</li>
              <li>Change every 4–6 hours</li>
              <li>Discard used pad by a wrapper</li>
            </ol>
            <a 
              href="https://www.wikihow.com/Use-a-Sanitary-Napkin-(Pad)"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              Step-by-step pad guide
            </a>
          </Card>

          <Card title="Tampons Tutorial">
            <ol className="list-decimal ml-4">
              <li>Wash hands</li>
              <li>Insert at an angle</li>
              <li>Change every 4–6 hours</li>
            </ol>
            <a
              href="https://obgyn.coloradowomenshealth.com/health-info/teens/how-to-insert-tampon"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              How to use a tampon
            </a>
          </Card>

          <Card title="Menstrual Cup Tutorial">
            <ol className="list-decimal ml-4">
              <li>Fold cup</li>
              <li>Insert and rotate</li>
              <li>Empty every 8–12 hours</li>
            </ol>
            <a
              href="https://dramitashah.com/beginners-guide-to-menstrual-cups/"
              target="_blank"
              rel="noreferrer"
              className="text-pink-600 underline text-sm"
            >
              Menstrual cup tutorial
            </a>
          </Card>
        </div>
      </Section>

      <p className="text-xs text-gray-500 mt-6">
        Educational content only. Not a substitute for professional medical advice.
      </p>

      <Link to="/dashboard" className="text-sm text-pink-600 hover:underline">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-pink-700 mb-3">
        {title}
      </h2>
      <div className="bg-rose-50 border border-rose-200 rounded-xl p-5 space-y-2 text-sm text-gray-700">
        {children}
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <h3 className="font-semibold text-pink-700 mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
}
