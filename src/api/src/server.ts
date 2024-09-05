import cors from "cors";
import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";
import estimationRoutes from "./routes/estimationRoutes";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/estimation", estimationRoutes);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express TypeScript API");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
