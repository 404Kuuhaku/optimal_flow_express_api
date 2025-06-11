import express, { Application } from "express";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import transferRoutes from "./routes/transferRoutes";
import errorHandler from "./middlewares/errorHandler";

const app: Application = express();

app.use(express.json()); // Middleware to parse JSON request bodies

// API Routes
app.use("/users", userRoutes);
app.use("/login", authRoutes);
app.use("/transfer", transferRoutes);

// Global Error Handler - MUST be the last middleware
app.use(errorHandler);

export default app;
