const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ACCESS_TOKEN_SECRET } = process.env;

exports.verifyAccessToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); 
  if (!token) return res.status(400).json({ status: false, msg: "Token not found" });

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) return res.status(401).json({ status: false, msg: "User not found" });
    next();
  } catch (err) {
    res.status(401).json({ status: false, msg: "Invalid token" });
  }
};
