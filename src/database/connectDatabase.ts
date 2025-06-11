import mongoose from "mongoose";
import config from "../config/config";
const connectDatabase = async () => {
	try {
		await mongoose.connect(config.mongoUri);
		console.log("MongoDB connected successfully!");
	} catch (error: any) {
		console.error("MongoDB connection error:", error.message || error);
		process.exit(1);
	}
};

export default connectDatabase;
