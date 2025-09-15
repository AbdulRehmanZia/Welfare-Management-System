import { ApiError, ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { donorValidation } from "../utils/validationSchema.js";
import { Donor } from "../models/donor.model.js";

// Create Donor
export const createDonor = async (req, res) => {
  try {
    const { error } = donorValidation.validate(req.body);
    if (error) return ApiError(res, 400, error.details[0].message);

    const { fullname, phoneNum, email, monthlyDonationAmount, donationFrequency } = req.body;

    const donor = await Donor.create({
      fullname,
      phoneNum,
      email,
      monthlyDonationAmount,
      donationFrequency,
    });

    return ApiResponse(res, 201, donor, "Donor created successfully");
  } catch (error) {
    console.error("Error creating donor", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Get All Donors
export const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    return ApiResponse(res, 200, donors, "All donors fetched successfully");
  } catch (error) {
    console.error("Error fetching donors", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Get Single Donor
export const getSingleDonor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid donor ID");
    }

    const donor = await Donor.findById(id);
    if (!donor) return ApiError(res, 404, "Donor not found");

    return ApiResponse(res, 200, donor, "Donor details fetched successfully");
  } catch (error) {
    console.error("Error fetching donor", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Update Donor
export const updateDonor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid donor ID");
    }

    const { error } = donorValidation.validate(req.body);
    if (error) return ApiError(res, 400, error.details[0].message);

    const updatedDonor = await Donor.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDonor) return ApiError(res, 404, "Donor not found");

    return ApiResponse(res, 200, updatedDonor, "Donor updated successfully");
  } catch (error) {
    console.error("Error updating donor", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Delete Donor
export const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid donor ID");
    }

    const donor = await Donor.findByIdAndDelete(id);
    if (!donor) return ApiError(res, 404, "Donor not found");

    return ApiResponse(res, 200, null, "Donor deleted successfully");
  } catch (error) {
    console.error("Error deleting donor", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};
