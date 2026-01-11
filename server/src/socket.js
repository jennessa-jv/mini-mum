import { Server } from "socket.io";
import SafetyZone from "./models/SafetyZone.js";
// import fetch from "node-fetch";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);
  });

  // 🔁 Stream every 15 seconds
  setInterval(streamFromML, 15000);
}

async function streamFromML() {
  try {
    const zones = await SafetyZone.find();
    console.log(`📦 Zones fetched: ${zones.length}`);

    const streamedZones = await Promise.all(
      zones.map(async (zone) => {
        // 🧠 Call Python ML API
        const res = await fetch("http://localhost:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crime_score: zone.crime_score,
          }),
        });

        const ml = await res.json();

        return {
          id: zone._id,
          name: zone.name,
          coordinates: zone.coordinates,
          crimeScore: zone.crime_score,
          riskLevel: ml.riskLevel,
          confidence: ml.confidence,
        };
      })
    );

    console.log(`📡 Emitting ${streamedZones.length} ML zones`);
    io.emit("risk-update", streamedZones);

  } catch (err) {
    console.error("❌ ML stream failed:", err.message);
  }
}
