import { Router } from "express";
import userRouter from "./user.route.js";
import beneficiaryRouter from "./beneficiary.route.js";
import packageRouter from "./package.route.js";
import donorRouter from "./donor.route.js"
const router = Router();

router.use("/api/v1/user", userRouter);
router.use("/api/v1/beneficiary", beneficiaryRouter);
router.use("/api/v1/package", packageRouter);
router.use("/ap1/v1/donor", donorRouter)

export default router;
