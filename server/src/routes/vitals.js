import express from "express";
import Vital from "../models/Vital.js";
import Pregnancy from "../models/Pregnancy.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/", auth, async (req, res) => {
  try {
    const {
      systolicBP,
      diastolicBP,
      weight,
      bloodSugar,
      heartRate
    } = req.body;

    // Validation
    if (
      systolicBP === undefined ||
      diastolicBP === undefined ||
      weight === undefined ||
      bloodSugar === undefined ||
      heartRate === undefined
    ) {
      return res.status(400).json({ message: "Missing vitals data" });
    }

    const pregnancy = await Pregnancy.findOne({
      user: req.user.id,
      status: "pregnant"
    });

    const vital = await Vital.create({
      user: req.user.id,
      pregnancy: pregnancy ? pregnancy._id : null,
      systolicBP: Number(systolicBP),
      diastolicBP: Number(diastolicBP),
      weight: Number(weight),
      bloodSugar: Number(bloodSugar),
      heartRate: Number(heartRate)
    });

    res.status(201).json(vital);
  } catch (err) {
    console.error("🔥 Vitals save error:", err);
    res.status(500).json({ message: "Failed to save vitals" });
  }
});

/**
 * GET LATEST VITALS
 * GET /api/vitals/latest
 */
router.get("/latest", auth, async (req, res) => {
  try {
    const vital = await Vital.findOne({ user: req.user.id }).sort({
      createdAt: -1
    });

    res.json(vital || null);
  } catch (err) {
    console.error("🔥 Fetch vitals error:", err);
    res.status(500).json({ message: "Failed to fetch vitals" });
  }
});

router.get("/history", auth, async (req, res) => {
  try {
    const vitals = await Vital.find({ user: req.user.id }).sort({
      createdAt: 1 // oldest → newest (perfect for charts)
    });

    res.json(vitals);
  } catch (err) {
    console.error("🔥 Fetch vitals history error:", err);
    res.status(500).json({ message: "Failed to fetch vitals history" });
  }
});


export default router;
