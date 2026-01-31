import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import periodRoutes from "./routes/period.js";
import predictRoutes from "./routes/predict.js";
import pregnancyRoutes from "./routes/pregnancy.js";
import vitalsRoutes from "./routes/vitals.js";
import safetyRoutes from "./routes/safety.js";
import doctorRoutes from "./routes/doctors.js";
import cancerPredictRoutes from "./routes/cancerPredict.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/doctors", doctorRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/period", periodRoutes);
app.use("/api/predict", predictRoutes);
app.use("/api/pregnancy", pregnancyRoutes);
app.use("/api/vitals", vitalsRoutes);
app.use("/api/safety-zones", safetyRoutes);
app.use("/api/cancer-predict", cancerPredictRoutes);
app.get("/", (req, res) => {
  res.send("Backend API running");
});

export default app;
