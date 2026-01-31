import mongoose from "mongoose";

const vitalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pregnancy: { type: mongoose.Schema.Types.ObjectId, ref: "Pregnancy" },

    systolicBP: Number,
    diastolicBP: Number,
    weight: Number,
    bloodSugar: Number,
    heartRate: Number,

    symptoms: [String]
  },
  { timestamps: true }
);

export default mongoose.model("Vital", vitalSchema);
