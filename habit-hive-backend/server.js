import dotenv from "dotenv";
dotenv.config();
console.log("🧠 Loaded from .env:", process.env.OPENAI_API_KEY);

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js";
import aiRoutes from "./routes/ai.js"; // AI Coach route


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes (AFTER app is defined)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/ai", aiRoutes);

// connect mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
