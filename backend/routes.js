// routes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const { verifyToken, verifyRole } = require("./middleware/auth");

const router = express.Router();

// LOGIN API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // DEBUG LOGS
  console.log("LOGIN DATA:", username, password);

  const user = await User.findOne({
    username: username.trim(),
    password: password.trim(),
  });

  console.log("FOUND USER:", user);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    "secretKey"
  );

  res.json({ token, role: user.role });
});

// USER ROUTE
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "User Profile", user: req.user });
});

// ADMIN ROUTE
router.get("/admin", verifyToken, verifyRole("admin"), (req, res) => {
  res.json({ message: "Admin Dashboard" });
});

module.exports = router;