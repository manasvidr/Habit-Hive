// server.js (root of backend)
import dotenv from "dotenv";
dotenv.config(); // important: load env early

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/auth.js";
import habitRoutes from "./routes/habits.js";

const app = express();

// allow custom origin from .env (useful for dev with separate frontend)
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/habits", habitRoutes);

// basic health route
app.get("/api/health", (req, res) => res.json({ ok: true, now: new Date().toISOString() }));

// mongoose connection
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
