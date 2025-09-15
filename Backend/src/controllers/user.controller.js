import { ApiError, ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const adminLogin = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return ApiError(res, 400, "Please Enter Both Email and Password");
    }
    console.log(process.env.ADMIN_EMAIL);
    console.log(process.env.ADMIN_PASSWORD);

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return ApiResponse(res, 400, "Invalid admin credentials");
    }
    const payload = {
      onoinavnaovnasvo: false,
    };

    const token = jwt.sign(payload, process.env.ADMIN_SECRET);

    ApiResponse(res, 200, token, "Admin logged in successfuly");
  } catch (error) {
    console.error("Error In Admin Login", error);
    return ApiError(res, 500, "Internal Server Error");
  }
};
