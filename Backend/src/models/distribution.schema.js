import mongoose from "mongoose";

const distributionSchema = new mongoose.Schema(
  {
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },
    packageType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Distribution = mongoose.model("Distribution", distributionSchema);
