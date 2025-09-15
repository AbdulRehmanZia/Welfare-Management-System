import { Router } from "express";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  getSinglePackage,
  updatePackage,
} from "../controllers/package.controller.js";
const router = Router();

router.post("/create", createPackage);
router.get("/", getAllPackages);
router.get("/:id", getSinglePackage);
router.put("/update/:id", updatePackage);
router.delete("/delete/:id", deletePackage);
export default router;
