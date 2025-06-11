import { Router } from "express";
import * as userController from "../controllers/userController";

const router = Router();


router.post("/", userController.createUser); // POST /users
router.get("/", userController.getAllUsers); // GET /users
router.get("/:id", userController.getUserById); // GET /users/:id

export default router;
