import { Beneficiary } from "../models/beneficiary.model.js";
import { beneficiaryValidation } from "../utils/validationSchema.js";
import { Distribution } from "../models/distribution.model.js";
import { ApiError, ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";


// Create Beneficiary
export const createBeneficiary = async (req, res) => {
  try {
    const { error } = beneficiaryValidation.validate(req.body);
    if (error) return ApiError(res, 400, error.details[0].message);

    const { fullName, address, CNIC, familySize, packageType } = req.body;

    const isExist = await Beneficiary.findOne({ CNIC });
    if (isExist) return ApiError(res, 400, "Beneficiary Already Exists");

    const beneficiary = await Beneficiary.create({
      fullName,
      CNIC,
      familySize,
      address,
    });

    if (packageType) {
      await Distribution.create({
        beneficiaryId: beneficiary._id, 
        packageType,
      });
    }

    return ApiResponse(res, 201, beneficiary, "Beneficiary registered successfully");
  } catch (error) {
    console.error("Error in creating beneficiary", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};


// Get All Beneficiaries
export const getAllBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find().sort({ createdAt: -1 });
    return ApiResponse(res, 200, beneficiaries, "All beneficiaries fetched successfully");
  } catch (error) {
    console.error("Error fetching beneficiaries", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};


// Get Single Beneficiary
export const getSingleBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid beneficiary ID");
    }

    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) return ApiError(res, 404, "Beneficiary not found");

    const distributions = await Distribution.find({ beneficiaryId: id }).populate("packageType");

    return ApiResponse(res, 200, { beneficiary, distributions }, "Beneficiary details fetched successfully");
  } catch (error) {
    console.error("Error fetching beneficiary", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};


// Update Beneficiary
export const updateBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid beneficiary ID");
    }

    const { error } = beneficiaryValidation.validate(req.body);
    if (error) return ApiError(res, 400, error.details[0].message);

    const updatedBeneficiary = await Beneficiary.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBeneficiary) return ApiError(res, 404, "Beneficiary not found");

    return ApiResponse(res, 200, updatedBeneficiary, "Beneficiary updated successfully");
  } catch (error) {
    console.error("Error updating beneficiary", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};


// Delete Beneficiary
export const deleteBeneficiary = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiError(res, 400, "Invalid beneficiary ID");
    }

    const beneficiary = await Beneficiary.findByIdAndDelete(id);
    if (!beneficiary) return ApiError(res, 404, "Beneficiary not found");

    await Distribution.deleteMany({ beneficiaryId: id });

    return ApiResponse(res, 200, null, "Beneficiary deleted successfully");
  } catch (error) {
    console.error("Error deleting beneficiary", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};
