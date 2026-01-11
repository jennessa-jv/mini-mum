import express from "express";
import SafetyZone from "../models/SafetyZone.js";

const router = express.Router();

// GET all zones
router.get("/", async (req, res) => {
  try {
    const zones = await SafetyZone.find();
    res.json(zones);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch zones" });
  }
});

export default router;
