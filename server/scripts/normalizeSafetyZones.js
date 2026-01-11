import mongoose from "mongoose";
import SafetyZone from "../src/models/SafetyZone.js";

const MONGO_URI = "mongodb://127.0.0.1:27017/maternal_quest";

const stateCoords = {
  "Andhra Pradesh": { lat: 15.9129, lng: 79.74 },
  "Arunachal Pradesh": { lat: 28.218, lng: 94.7278 },
  "Assam": { lat: 26.2006, lng: 92.9376 },
  "Bihar": { lat: 25.0961, lng: 85.3131 },
  "Chhattisgarh": { lat: 21.2787, lng: 81.8661 },
  "Goa": { lat: 15.2993, lng: 74.124 },
  "Gujarat": { lat: 22.2587, lng: 71.1924 },
  "Haryana": { lat: 29.0588, lng: 76.0856 },
  "Himachal Pradesh": { lat: 31.1048, lng: 77.1734 },
  "Jharkhand": { lat: 23.6102, lng: 85.2799 },
  "Karnataka": { lat: 15.3173, lng: 75.7139 },
  "Kerala": { lat: 10.8505, lng: 76.2711 },
  "Madhya Pradesh": { lat: 22.9734, lng: 78.6569 },
  "Maharashtra": { lat: 19.7515, lng: 75.7139 },
  "Odisha": { lat: 20.9517, lng: 85.0985 },
  "Punjab": { lat: 31.1471, lng: 75.3412 },
  "Rajasthan": { lat: 27.0238, lng: 74.2179 },
  "Tamil Nadu": { lat: 11.1271, lng: 78.6569 },
  "Telangana": { lat: 18.1124, lng: 79.0193 },
  "Uttar Pradesh": { lat: 26.8467, lng: 80.9462 },
  "West Bengal": { lat: 22.9868, lng: 87.855 }
};

async function normalize() {
  // 1️⃣ Connect
  await mongoose.connect(MONGO_URI);
  console.log("🟢 MongoDB connected");

  // 2️⃣ Read RAW CSV documents directly from MongoDB
//   const rawCollection = mongoose.connection.db.collection("safetyzones_raw");
const rawCollection = mongoose.connection.db.collection("safetyzones_raw");

  const rawDocs = await rawCollection.find({}).toArray();

  if (!rawDocs.length) {
    console.error("❌ No raw CSV documents found in safetyzones");
    process.exit(1);
  }

  console.log("🔍 Sample document keys:", Object.keys(rawDocs[0]));

  // 3️⃣ Detect numeric case field automatically
  const caseField = Object.keys(rawDocs[0]).find(
    k => k.includes("Protection") || k.includes("POCSO")
  );

  if (!caseField) {
    console.error("❌ Could not detect crime cases field");
    process.exit(1);
  }

  console.log("🧠 Detected case field:", caseField);

  // 4️⃣ Extract valid case values
  const validCases = rawDocs
    .map(d =>
      Number(String(d[caseField]).replace(/,/g, "").trim())
    )
    .filter(v => Number.isFinite(v) && v > 0);

  if (!validCases.length) {
    console.error("❌ No valid numeric case data found");
    process.exit(1);
  }

  const maxCases = Math.max(...validCases);
  console.log("📊 Max cases:", maxCases);

  // 5️⃣ Clear collection
  await SafetyZone.deleteMany({});

  let inserted = 0;

  // 6️⃣ Normalize + insert
  for (const d of rawDocs) {
    const state = d["States/UTs"];
    const cases = Number(
      String(d[caseField]).replace(/,/g, "").trim()
    );

    if (!Number.isFinite(cases)) continue;
    if (!stateCoords[state]) continue;

    const crime_score = cases / maxCases;
    if (!Number.isFinite(crime_score)) continue;

    await SafetyZone.create({
      name: state,
      state,
      coordinates: stateCoords[state],
      crime_score
    });

    inserted++;
  }

  console.log(`✅ Inserted ${inserted} normalized safety zones`);
  process.exit();
}

normalize();
