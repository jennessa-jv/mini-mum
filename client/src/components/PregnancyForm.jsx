import { useState } from "react";
import api from "../services/api";

export default function PregnancyForm({ onCreated }) {
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/pregnancy", { startDate, dueDate });
      onCreated();
    } catch (err) {
      console.error("Pregnancy creation failed:", err);
      alert("Failed to create pregnancy");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border p-2 w-full" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 w-full" />

      <button className="bg-pink-600 text-white px-4 py-2 rounded">
        Save Pregnancy
      </button>
    </form>
  );
}
