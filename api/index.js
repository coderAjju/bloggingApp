import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(cookieParser())
app.use(express.json());
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.code || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
