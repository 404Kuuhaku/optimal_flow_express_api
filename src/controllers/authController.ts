import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService";

/**
 * Handles user authentication (login).
 * POST /login
 */
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ message: "Email and password are required." });
			return;
		}
		const { user, token } = await authService.authenticateUser(email, password);
		res.status(200).json({
			message: "Login successful",
			user,
			token
		});
	} catch (error) {
		next(error);
	}
};

export { loginUser };
