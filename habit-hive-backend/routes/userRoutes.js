import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET profile
router.get("/profile", protect, async (req, res) => {
  res.json({
    name: req.user.name,
    email: req.user.email,
    bio: req.user.bio,
    profilePicture: req.user.profilePicture,
  });
});

// UPDATE profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, bio, profilePicture } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.name = name || user.name;
    user.bio = bio || user.bio;
    user.profilePicture = profilePicture || user.profilePicture;

    const updatedUser = await user.save();
    res.json({
      message: "Profile updated",
      user: {
        name: updatedUser.name,
        email: updatedUser.email,
        bio: updatedUser.bio,
        profilePicture: updatedUser.profilePicture,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
