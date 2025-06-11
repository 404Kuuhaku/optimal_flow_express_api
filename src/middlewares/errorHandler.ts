import { Request, Response, NextFunction } from "express";

/**
 * Global error handling middleware.
 * Catches errors passed from controllers/services via next(error).
 */
const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// Only log errors in non-test environment
	if (process.env.NODE_ENV !== 'test') {
		console.error(err.stack); // Log the full error stack for debugging
	}

	// Default status code and message
	let statusCode = 500;
	let message = "Internal Server Error";

	// Specific error handling based on the error message or type
	if (err.message === "Name, email, and password are required.") {
		statusCode = 400; // Bad Request
		message = err.message;
	} else if (err.message === "User with this email already exists.") {
		statusCode = 400; // Bad Request - User already exists
		message = err.message;
	} else if (err.message === "Invalid email or password.") {
		statusCode = 401; // Unauthorized
		message = err.message;
	} else if (err.message === "User not found.") {
		statusCode = 404; // Not Found
		message = err.message;
	}
	// Handle transfer and validation errors
	else if (
		err.message === "Insufficient balance" ||
		err.message === "Cannot transfer to the same user" ||
		err.message === "One or both users not found" ||
		err.message === "Transfer amount must be greater than 0" ||
		err.message === "Email and password are required."
	) {
		statusCode = 400;
		message = err.message;
	}
	// Handle Mongoose specific errors if needed (e.g., CastError, ValidationError)
	else if (err.name === "CastError") {
		statusCode = 400;
		message = `Invalid ID format: ${err.value}`;
	} else if (err.name === "ValidationError") {
		statusCode = 400;
		message = err.message; // Mongoose validation error message
	}

	res.status(statusCode).json({ message });
};

export default errorHandler;
