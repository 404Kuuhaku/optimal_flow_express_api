import "dotenv/config"; 
import app from "./app";
import config from "./config/config";
import connectDatabase from "./database/connectDatabase";

const PORT = config.port;

connectDatabase() 
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server running on http://localhost:${PORT}`);
			console.log("Press CTRL+C to stop");
		});
	})
	.catch((error) => {
		console.error(
			"Failed to connect to the database or start server:",
			error
		);
		process.exit(1); 
	});
