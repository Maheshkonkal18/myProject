import express from "express";
import FoundItem from "../models/FoundItem.js";
import { authMiddleware, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/found
router.get("/", async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/found
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, location, date, contactInfo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const item = await FoundItem.create({
      title,
      description,
      location,
      date: date ? new Date(date) : null,
      contactInfo,
      createdByName: req.user.name || null,
      createdByUsn: req.user.usn || null
    });

    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE /api/found/:id  (Admin only)
router.delete("/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const deleted = await FoundItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
