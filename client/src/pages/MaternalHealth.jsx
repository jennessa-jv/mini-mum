import { useEffect, useState } from "react";
import api from "../services/api";
import PregnancyForm from "../components/PregnancyForm";
import VitalsForm from "../components/VitalsForm";

export default function MaternalHealth() {
  const [pregnancy, setPregnancy] = useState(null);
  const [vital, setVital] = useState(null);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingVitals, setEditingVitals] = useState(false);

  const fetchAll = async () => {
    try {
      const pregRes = await api.get("/pregnancy/current");
      setPregnancy(pregRes.data);

      if (pregRes.data) {
        const vitalsRes = await api.get("/vitals/latest");
        setVital(vitalsRes.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);


  const isCriticalVitals = (v) => {
    if (!v) return false;

    const systolicBP = Number(v.systolicBP);
    const diastolicBP = Number(v.diastolicBP);
    const heartRate = Number(v.heartRate);
    const bloodSugar = Number(v.bloodSugar);

    return (
      systolicBP >= 160 ||
      diastolicBP <= 40 ||
      diastolicBP >= 110 ||
      heartRate >= 120 ||
      bloodSugar >= 180
    );
  };

  const predictRisk = async () => {
    if (!vital) {
      setRisk("No vitals available");
      return;
    }

    if (isCriticalVitals(vital)) {
      setRisk("High (Rule-based override)");
      return;
    }

    try {
      const res = await api.post("/predict", {
        systolicBP: vital.systolicBP,
        diastolicBP: vital.diastolicBP,
        weight: vital.weight,
        bloodSugar: vital.bloodSugar,
        heartRate: vital.heartRate
      });

      setRisk(res.data.risk);
    } catch (err) {
      console.error("Prediction failed:", err);
      setRisk("Prediction failed");
    }
  };


  const handleVitalsSaved = async () => {
    setEditingVitals(false);
    setRisk(null);
    await fetchAll();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold">Maternal Health</h2>


      {!pregnancy && <PregnancyForm onCreated={fetchAll} />}


      {pregnancy && (!vital || editingVitals) && (
        <VitalsForm
          onSaved={handleVitalsSaved}
          initialValues={editingVitals ? vital : null}
        />
      )}

   
      {vital && !editingVitals && (
        <>
          <div className="space-y-1">
            <p>BP: {vital.systolicBP}/{vital.diastolicBP}</p>
            <p>Blood Sugar: {vital.bloodSugar}</p>
            <p>Heart Rate: {vital.heartRate}</p>
            <p>Weight: {vital.weight}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={predictRisk}
              className="bg-pink-600 text-white px-4 py-2 rounded"
            >
              Predict Risk
            </button>

            <button
              onClick={() => setEditingVitals(true)}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Update Vitals
            </button>
          </div>
        </>
      )}


      {risk && (
        <div className="bg-red-100 p-4 rounded">
          <p className="font-semibold">Predicted Risk</p>
          <p>{risk}</p>
        </div>
      )}
    </div>
  );
}
