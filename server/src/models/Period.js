import mongoose from "mongoose";

const periodSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, required: true }
  },
  { timestamps: true }
);

export const Period = mongoose.model("Period", periodSchema);
