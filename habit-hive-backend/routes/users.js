// routes/users.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const auth = require('../middleware/auth');
const User = require('../models/User');

// local disk storage for avatars (for quick dev). In prod use S3/Cloud Storage.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.user._id}_${Date.now()}${ext}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 2 * 1024 * 1024 } }); // 2MB limit

/**
 * GET /api/users/me
 * Headers: Authorization: Bearer <token>
 */
router.get('/me', auth, async (req, res) => {
  res.json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    avatarUrl: req.user.avatarUrl,
    bio: req.user.bio
  });
});

/**
 * PUT /api/users/me
 * body: { name, bio }
 */
router.put('/me', auth, async (req, res) => {
  try {
    const { name, bio } = req.body;
    if (name) req.user.name = name;
    if (bio) req.user.bio = bio;
    await req.user.save();
    res.json({ success: true, user: { id: req.user._id, name: req.user.name, email: req.user.email, avatarUrl: req.user.avatarUrl, bio: req.user.bio }});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * POST /api/users/me/avatar   (multipart form-data) field: avatar
 */
router.post('/me/avatar', auth, upload.single('avatar'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    // In production you'd upload to cloud and store URL
    const avatarUrl = `/uploads/${req.file.filename}`;
    req.user.avatarUrl = avatarUrl;
    await req.user.save();
    res.json({ success: true, avatarUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
