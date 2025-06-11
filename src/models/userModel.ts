import mongoose, { Schema, CallbackError } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
	_id: string;
	name: string;
	email: string;
	password: string;
	balance: number;
}

export type UserWithoutPassword = Omit<IUser, "password" | "__v">;

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		balance: {
			type: Number,
			default: 100,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) {
		return next();
	}
	try {
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);
		next();
	} catch (error: unknown) {
		if (error instanceof Error) {
			return next(error as CallbackError);
		} else {
			return next(
				new Error(
					"Unknown error occurred during password hashing"
				) as CallbackError
			);
		}
	}
});

userSchema.methods.comparePassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

const UserModel =
	mongoose.models.UserModel || mongoose.model("User", userSchema);
export default UserModel;
