// middleware/auth.js
const jwt = require("jsonwebtoken");

// Verify Token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, "secretKey");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// Role-based middleware
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
};

module.exports = { verifyToken, verifyRole };
