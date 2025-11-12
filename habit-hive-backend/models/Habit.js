import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    goal: { type: Number, required: true },
    progress: { type: Number, default: 0 },
    unit: { type: String },
    history: [
      {
        date: { type: Date, default: Date.now },
        value: { type: Number, default: 0 },
      },
    ],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);
