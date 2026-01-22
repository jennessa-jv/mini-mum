import { useState } from "react";
import api from "../services/api";

export default function CancerPrediction() {
  const [features, setFeatures] = useState(Array(30).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = Number(value);
    setFeatures(updated);
  };

  const predict = async () => {
    setLoading(true);
    try {
      const res = await api.post("/cancer/predict", {
        features
      });
      setResult(res.data);
    } catch (err) {
      alert("Prediction failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-pink-700 mb-6">
        🧬 Breast Cancer Prediction
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {features.map((val, i) => (
          <input
            key={i}
            type="number"
            placeholder={`Feature ${i + 1}`}
            value={val}
            onChange={(e) => handleChange(i, e.target.value)}
            className="border p-2 rounded"
          />
        ))}
      </div>

      <button
        onClick={predict}
        className="bg-pink-600 text-white px-6 py-2 rounded-lg"
      >
        {loading ? "Predicting..." : "Predict"}
      </button>

      {result && (
        <div className="mt-6 bg-rose-50 p-4 rounded-xl border">
          <p>
            🩺 Result:{" "}
            <span className="font-bold">{result.prediction}</span>
          </p>
          <p>📊 Probability: {result.probability}</p>
        </div>
      )}
    </div>
  );
}
