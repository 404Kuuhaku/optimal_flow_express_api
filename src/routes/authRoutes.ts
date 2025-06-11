import { Router } from "express";
import * as authController from "../controllers/authController";


const router = Router();

// Authentication routes
router.post("/", authController.loginUser);

export default router; 