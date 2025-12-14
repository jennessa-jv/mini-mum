import express from "express";
import Vital from "../models/Vital.js";
import Pregnancy from "../models/Pregnancy.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const pregnancy = await Pregnancy.findOne({
    user: req.user.id,
    status: "pregnant"
  });

  const vital = await Vital.create({
    user: req.user.id,
    pregnancy: pregnancy?._id,
    ...req.body
  });

  res.status(201).json(vital);
});

router.get("/latest", auth, async (req, res) => {
  const vital = await Vital.findOne({ user: req.user.id }).sort({
    createdAt: -1
  });
  res.json(vital);
});

router.get("/history", auth, async (req, res) => {
  const vitals = await Vital.find({ user: req.user.id }).sort({
    createdAt: -1
  });
  res.json(vitals);
});

export default router;
