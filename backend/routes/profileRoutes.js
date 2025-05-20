const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/profileControllers");
const { verifyAccessToken } = require("../middleware/authMiddleware");

// Routes beginning with /api/profile
router.get("/", verifyAccessToken, getProfile);

module.exports = router;