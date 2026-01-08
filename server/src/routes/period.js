import express from "express";
import {Period} from "../models/Period.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const period = await Period.create({
    user: req.user.id,
    startDate: req.body.startDate
  });
  res.status(201).json(period);
});

router.get("/predict", auth, async (req, res) => {
  const periods = await Period.find({ user: req.user.id }).sort({
    startDate: 1
  });

  if (periods.length < 2) {
    return res.status(400).json({
      message: "Not enough data"
    });
  }
  router.get("/history", auth, async (req, res) => {
  const periods = await Period.find({ user: req.user.id }).sort({
    startDate: 1
  });
  res.json(periods);
});


  const diffs = [];

  for (let i = 1; i < periods.length; i++) {
    const diff =
      (periods[i].startDate - periods[i - 1].startDate) /
      (1000 * 60 * 60 * 24);

    if (diff >= 15 && diff <= 60) {
      diffs.push(diff);
    }
  }

  if (!diffs.length) {
    return res.status(400).json({
      message: "Invalid cycle data"
    });
  }

  diffs.sort((a, b) => a - b);
  const mid = Math.floor(diffs.length / 2);
  const learnedCycle =
    diffs.length % 2 !== 0
      ? diffs[mid]
      : (diffs[mid - 1] + diffs[mid]) / 2;

  const lastDate = periods[periods.length - 1].startDate;

  const predictedNextPeriod = new Date(
    lastDate.getTime() +
      learnedCycle * 24 * 60 * 60 * 1000
  );
console.log("🔥 REAL Period.js LOADED");

  res.json({
    learnedCycle: Math.round(learnedCycle),
    predictedNextPeriod
  });
});

export default router;
