import { Package } from "../models/package.model.js";
import { ApiError, ApiResponse } from "../utils/ApiResponse.js";
import { packageValidation } from "../utils/validationSchema.js";

// Create a package
export const createPackage = async (req, res) => {
  try {
    const { error } = packageValidation.validate(req.body);
    if (error) return ApiError(res, 400, error.details[0].message);

    const { name, items } = req.body;
    const newPackage = await Package.create({ name, items });

    return ApiResponse(res, 201, newPackage, "Package created successfully");
  } catch (error) {
    console.error("Error creating package:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Get all packages
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    return ApiResponse(res, 200, packages, "Packages fetched successfully");
  } catch (error) {
    console.error("Error fetching packages:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Get a single package
export const getSinglePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await Package.findById(id);
    if (!pkg) return ApiError(res, 404, "Package not found");

    return ApiResponse(res, 200, pkg, "Package fetched successfully");
  } catch (error) {
    console.error("Error fetching package:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Update package
export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, items } = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      { name, items },
      { new: true, runValidators: true }
    );

    if (!updatedPackage) return ApiError(res, 404, "Package not found");

    return ApiResponse(res, 200, updatedPackage, "Package updated successfully");
  } catch (error) {
    console.error("Error updating package:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};

// Delete package
export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) return ApiError(res, 404, "Package not found");

    return ApiResponse(res, 200, null, "Package deleted successfully");
  } catch (error) {
    console.error("Error deleting package:", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};
