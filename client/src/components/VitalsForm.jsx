import { useState } from "react";
import api from "../services/api";

export default function VitalsForm({ onSaved, initialValues }) {
  const [form, setForm] = useState({
    systolicBP: initialValues?.systolicBP ?? "",
    diastolicBP: initialValues?.diastolicBP ?? "",
    weight: initialValues?.weight ?? "",
    bloodSugar: initialValues?.bloodSugar ?? "",
    heartRate: initialValues?.heartRate ?? ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/vitals", {
        systolicBP: Number(form.systolicBP),
        diastolicBP: Number(form.diastolicBP),
        weight: Number(form.weight),
        bloodSugar: Number(form.bloodSugar),
        heartRate: Number(form.heartRate)
      });

      onSaved();
    } catch (err) {
      console.error("Failed to save vitals", err);
      alert("Failed to save vitals");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="systolicBP"
        value={form.systolicBP}
        onChange={handleChange}
        placeholder="Systolic BP"
        className="border p-2 w-full"
      />

      <input
        name="diastolicBP"
        value={form.diastolicBP}
        onChange={handleChange}
        placeholder="Diastolic BP"
        className="border p-2 w-full"
      />

      <input
        name="weight"
        value={form.weight}
        onChange={handleChange}
        placeholder="Weight"
        className="border p-2 w-full"
      />

      <input
        name="bloodSugar"
        value={form.bloodSugar}
        onChange={handleChange}
        placeholder="Blood Sugar"
        className="border p-2 w-full"
      />

      <input
        name="heartRate"
        value={form.heartRate}
        onChange={handleChange}
        placeholder="Heart Rate"
        className="border p-2 w-full"
      />

      <button className="bg-pink-600 text-white px-4 py-2 rounded">
        Save Vitals
      </button>
    </form>
  );
}
