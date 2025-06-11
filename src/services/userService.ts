import UserModel, { UserWithoutPassword } from "../models/userModel";

/**
 * Creates a new user in the database.
 * @param {object} userDetails - The user details (name, email, password).
 * @returns {Promise<UserWithoutPassword>} The created user object without the password.
 * @throws {Error} If a user with the given email already exists or if input is invalid.
 */
const createUser = async (userDetails: {
	name: string;
	email: string;
	password: string;
}): Promise<UserWithoutPassword> => {
	const { name, email, password } = userDetails;

	if (!name || !email || !password) {
		throw new Error("Name, email, and password are required.");
	}

	const existingUser = await UserModel.findOne({ email });
	if (existingUser) {
		throw new Error("User with this email already exists.");
	}

	const newUser = new UserModel({
		name,
		email,
		password,
		// balance: 100,
	});

	await newUser.save();

	const { password: _, __v, ...userWithoutPassword } = newUser.toObject();
	return userWithoutPassword;
};

/**
 * Retrieves all users from the database.
 * @returns {Promise<UserWithoutPassword[]>} An array of user objects without passwords.
 */
const getAllUsers = async (): Promise<UserWithoutPassword[]> => {
	const users = await UserModel.find({});
	return users.map((user) => {
		const { password: _, __v, ...userWithoutPassword } = user.toObject();
		return userWithoutPassword;
	});
};

/**
 * Retrieves a single user by their MongoDB _id.
 * @param {string} userId - The string representation of MongoDB's _id.
 * @returns {Promise<UserWithoutPassword>} The user object without the password.
 * @throws {Error} If the user is not found or ID format is invalid.
 */
const getUserById = async (id: string): Promise<UserWithoutPassword> => {
	const user = await UserModel.findById(id);

	if (!user) {
		throw new Error("User not found.");
	}

	const { password: _, __v, ...userWithoutPassword } = user.toObject();
	return userWithoutPassword;
};

export { createUser, getAllUsers, getUserById };
