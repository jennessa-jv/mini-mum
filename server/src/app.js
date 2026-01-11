import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import periodRoutes from "./routes/period.js";
import predictRoutes from "./routes/predict.js";
import pregnancyRoutes from "./routes/pregnancy.js";
import vitalsRoutes from "./routes/vitals.js";
import safetyRoutes from "./routes/safety.js";

const app = express();

// 🌍 Middleware
app.use(cors());
app.use(express.json());

// 🧩 API Routes
app.use("/api/auth", authRoutes);
app.use("/api/period", periodRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/pregnancy", pregnancyRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/safety-zones", safetyRoutes);

// 🧪 Health check (optional but useful)
app.get("/", (req, res) => {
  res.send("✅ Backend API running");
});

export default app;
