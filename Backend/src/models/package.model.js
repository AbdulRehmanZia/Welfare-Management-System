import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
});

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },
    items: [itemSchema],
  },
  { timestamps: true }
);

export const Package = mongoose.model("Package", packageSchema);
