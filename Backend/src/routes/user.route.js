import { Router } from "express";
import { adminLogin } from "../controllers/user.controller.js";
const router = Router();

router.post("/login", adminLogin);
export default router;
