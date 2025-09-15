import { Router } from "express";
import { createDonor, deleteDonor, getAllDonors, getSingleDonor, updateDonor } from "../controllers/donor.controller.js";

const router = Router();

router.post("/register", createDonor);
router.get("/", getAllDonors);
router.get("/:id", getSingleDonor);
router.put("/update/:id", updateDonor);
router.delete("/delete/:id", deleteDonor);

export default router;
