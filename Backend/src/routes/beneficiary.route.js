import { Router } from "express";
import {
  createBeneficiary,
  deleteBeneficiary,
  getAllBeneficiaries,
  getSingleBeneficiary,
  updateBeneficiary,
} from "../controllers/beneficiary.controller.js";
const router = Router();

router.post("/register", createBeneficiary);
router.get("/", getAllBeneficiaries);
router.get("/:id", getSingleBeneficiary);
router.put("/update/:id", updateBeneficiary);
router.delete("/delete/:id", deleteBeneficiary);

export default router;
