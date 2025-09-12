import mongoose from "mongoose";
const beneficiarySchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    CNIC: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    familySize: {
      type: Number,
      required: true,
    },
    packageType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true,
    },
  },
  { timestamps: true }
);

export const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
