import Joi from "joi";

export const beneficiaryValidation = Joi.object({
  fullName: Joi.string().trim().min(3).max(100).required(),
  CNIC: Joi.string()
    .pattern(/^[0-9]{13}$/)
    .required()
    .messages({
      "string.pattern.base": "CNIC must be a valid 13-digit number",
    }),
  address: Joi.string().trim().min(5).max(255).required(),
  familySize: Joi.number().integer().min(1).max(50).required(),

  packageType: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) 
    .optional()
    .messages({
      "string.pattern.base": "packageType must be a valid MongoDB ObjectId",
    }),
});


export const packageValidation = Joi.object({
  name: Joi.string()
    .valid("Small", "Medium", "Large")
    .required()
    .messages({
      "any.only": "Package name must be either Small, Medium, or Large",
      "string.empty": "Package name is required",
    }),

  items: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().trim().required().messages({
          "string.empty": "Item name is required",
        }),
        quantity: Joi.string().trim().required().messages({
          "string.empty": "Item quantity is required",
        }),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one item is required in the package",
    }),
});


export const donorValidation = Joi.object({
  fullname: Joi.string().trim().min(3).max(100).required(),
  phoneNum: Joi.string()
    .pattern(/^[0-9]{10,15}$/) 
    .required()
    .messages({
      "string.pattern.base": "Phone number must be valid (10-15 digits)",
    }),
  email: Joi.string().email().optional(),
  monthlyDonationAmount: Joi.number().min(1).optional(),
  donationFrequency: Joi.string()
    .valid("Monthly", "Quarterly", "One-time")
    .required()
    .messages({
      "any.only": "Donation frequency must be Monthly, Quarterly, or One-time",
    }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Email must be valid",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});


