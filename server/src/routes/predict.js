import express from "express";
import axios from "axios";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const mlResponse = await axios.post(
      "http://localhost:8000/predict",
      {
        systolicBP: req.body.systolicBP,
        diastolicBP: req.body.diastolicBP,
        weight: req.body.weight,
        bloodSugar: req.body.bloodSugar,
        heartRate: req.body.heartRate
      }
    );

    res.json(mlResponse.data);
  } catch (error) {
    res.status(500).json({ message: "ML prediction failed" });
  }
});

export default router;
