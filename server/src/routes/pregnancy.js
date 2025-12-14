import express from "express";
import Pregnancy from "../models/Pregnancy.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { startDate, dueDate } = req.body;

  const pregnancy = await Pregnancy.create({                // So instead of this ❌:  user: req.body.userId You correctly do this ✅:user: req.user.id
// Because:
// req.user.id comes from signed token
// Token cannot be forged without secret
// Backend fully controls identity
    user: req.user.id,
    startDate,
    dueDate
  });

  res.status(201).json(pregnancy);
});

router.get("/current", auth, async (req, res) => {
  const pregnancy = await Pregnancy.findOne({
    user: req.user.id,
    status: "pregnant"
  });

  res.json(pregnancy);
});

export default router;
