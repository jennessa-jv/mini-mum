import mongoose from "mongoose";

const pregnancySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pregnant", "postpartum"],
      default: "pregnant"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Pregnancy", pregnancySchema);
