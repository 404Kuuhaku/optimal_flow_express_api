import { Router } from "express";
import * as transferController from "../controllers/transferController";

const router = Router();

// Transfer routes
router.post("/", transferController.transferBalance);

export default router; 