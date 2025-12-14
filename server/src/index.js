import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
// import pregnancyRoutes from "./routes/pregnancy.js";
// import vitalsRoutes from "./routes/vitals.js";
// import predictRoutes from "./routes/predict.js";
dotenv.config(); //🔹 Belongs to: Node.js🔹 What it does:Reads .env Makes variables available via process.env
connectDB(); //🔹 Belongs to: Node.js🔹 What it does:Connects your app to MongoDB Runs once when the server starts

const app = express(); //belongs to express, app is the SERVER
app.use(cors()); //express again
app.use(express.json()); //express 🔹 Belongs to: Express 🔹 What it does: Allows server to read JSON from requests Without this: req.body === undefined
// where ever app.use is there itll be express only

app.use("/api/auth", authRoutes);
// app.use("/api/pregnancy", pregnancyRoutes);
// app.use("/api/vitals", vitalsRoutes);
// app.use("/api/predict", predictRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`✅ Server running on port ${PORT}`)
);



