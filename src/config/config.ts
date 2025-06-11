interface AppConfig {
	port: number;
	mongoUri: string;
}

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI; 

if (!PORT || !MONGODB_URI) {
	throw new Error("Please set environment variables: PORT and MONGODB_URI");
}

const config: AppConfig = {
	port: parseInt(PORT, 10),
	mongoUri: MONGODB_URI,
};

export default config;
