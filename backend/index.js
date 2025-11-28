import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./src/config/db.js";
import noteRoutes from "./src/Routes/notes.routes.js";
import authRoutes from "./src/Routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // allow cookies / auth headers if needed
  })
);
// Body parser middleware: Allows the app to handle JSON data sent in the request body
app.use(express.json());
app.use(cookieParser());
// Body parser for form data (optional, but good practice)
// Note: You used 'express.urlencoded' which is the function name, not the function call.
app.use(express.urlencoded({ extended: false }));

// --- 2. Database Connection ---

// Connect to MongoDB
connectDB();

// --- 3. Route Mounting ---

// Define the API version and mount routes
// e.g., Notes routes will be accessible at /api/v1/notes
app.use("/api/notes", noteRoutes);
app.use("/api/auth", authRoutes);

// Simple default route for health check
app.get("/", (req, res) => {
  res.send("Notes App Backend API is running...");
});

// --- 4. Server Start ---

// Define the port, prioritizing environment variable PORT or defaulting to 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  console.log(`Access the API at http://localhost:${PORT}`);
});
