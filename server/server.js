import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import lostRoutes from "./routes/lost.js";
import foundRoutes from "./routes/found.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // or 3000 depending on client
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/lost", lostRoutes);
app.use("/api/found", foundRoutes);

// Basic health check
app.get("/", (req, res) => {
  res.send("VVCE Lost & Found API running");
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Mongo connection error:", err);
  });
