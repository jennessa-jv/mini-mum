import { Server } from "socket.io";
import axios from "axios";
import SafetyZone from "./models/SafetyZone.js";

let io;

export function initSocket(server) {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);
  });

  // stream every 15 seconds
  setInterval(streamFromML, 15000);
}

async function streamFromML() {
  try {
    const zones = await SafetyZone.find();
    console.log(`📦 Zones fetched: ${zones.length}`);

    const enriched = await Promise.all(
      zones.map(async (z) => {
        try {
          const res = await axios.post(
            "http://127.0.0.1:8000/predict",
            {
              crime_score: Number(z.crime_score),
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: 5000,
            }
          );

          return {
            id: z._id,
            name: z.name,
            coordinates: z.coordinates,
            crimeScore: z.crime_score,
            riskLevel: res.data.riskLevel,
            confidence: res.data.confidence,
          };
        } catch (err) {
          console.error(
            `❌ ML axios failed for ${z.name}:`,
            err.response?.data || err.message
          );

          // fallback so socket never breaks
          return {
            id: z._id,
            name: z.name,
            coordinates: z.coordinates,
            crimeScore: z.crime_score,
            riskLevel: "Unknown",
            confidence: 0,
          };
        }
      })
    );

    io.emit("risk-update", enriched);
    console.log(`📡 Emitting ${enriched.length} ML zones`);
  } catch (err) {
    console.error("❌ ML stream failed:", err.message);
  }
}
