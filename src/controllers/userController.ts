import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

/**
 * Handles the creation of a new user.
 * POST /users
 */
const createUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { name, email, password } = req.body;
		const newUser = await userService.createUser({ name, email, password });
		res.status(201).json(newUser);
	} catch (error) {
		next(error); // Pass error to the next middleware (error handler)
	}
};



/**
 * Handles listing all users.
 * GET /users
 */
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await userService.getAllUsers();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

/**
 * Handles retrieving a single user by ID.
 * GET /users/:id
 */
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;
		const user = await userService.getUserById(id);
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

export { createUser, getAllUsers, getUserById };
