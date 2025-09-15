import mongoose from "mongoose";
const beneficiarySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    CNIC: {
      type: String,
      required: true,
      unique: true

    },
    address: {
      type: String,
      required: true,
    },
    familySize: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
