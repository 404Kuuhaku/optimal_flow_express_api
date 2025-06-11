import UserModel, { UserWithoutPassword } from "../models/userModel";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	throw new Error("JWT_SECRET is not set");
}

/**
 * Authenticates a user and generates a JWT token
 * @param {string} email - The user's email
 * @param {string} password - The user's password
 * @returns {Promise<{user: UserWithoutPassword, token: string}>} The user object and JWT token
 */
const authenticateUser = async (
	email: string,
	password: string
): Promise<{ user: UserWithoutPassword; token: string }> => {
	const user = await UserModel.findOne({ email });
	if (!user) {
		throw new Error("Invalid email or password.");
	}

	const passwordMatch = await user.comparePassword(password);
	if (!passwordMatch) {
		throw new Error("Invalid email or password.");
	}

	// Generate JWT token
	const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
		expiresIn: "24h",
	});

	const { password: _, __v, ...userWithoutPassword } = user.toObject();
	return { user: userWithoutPassword, token };
};

export { authenticateUser };
