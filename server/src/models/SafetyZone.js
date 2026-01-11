import mongoose from "mongoose";

const safetyZoneSchema = new mongoose.Schema({
  name: String,
  state: String,
  coordinates: {
    lat: Number,
    lng: Number,
  },
  crime_score: Number, // normalized 0–1 (from CSV / NCRB)
});

export default mongoose.model(
  "SafetyZone",
  safetyZoneSchema,
  "safetyzones" // 👈 FORCE exact MongoDB collection
);

