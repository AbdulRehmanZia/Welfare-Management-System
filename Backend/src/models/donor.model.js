import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    phoneNum: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    monthlyDonationAmount: {
      type: Number,
    },
    donationFrequency: {
      type: String,
      enum: ["Monthly", "Quarterly", "One-time"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Donor = mongoose.model("Donor", donorSchema);
