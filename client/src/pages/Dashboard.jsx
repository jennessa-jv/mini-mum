import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  // const [vital, setVital] = useState(null);
  // const [risk, setRisk] = useState(null);

  // useEffect(() => {
  //   api.get("/vitals/latest").then((res) => setVital(res.data));
  // }, []);

  // const runPrediction = async () => {
  //   const res = await api.post("/predict", vital);
  //   setRisk(res.data);
  // };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

        <div className="bg-pink p-4 mb-4">
          <p>BP:hello</p>
          <p>Weight: hi</p>

        </div>


        <div className="bg-red-100 p-4">
          <p>Risk Level:none</p>
          <p>healthy af</p>
        </div>
    </div>
  );
}
