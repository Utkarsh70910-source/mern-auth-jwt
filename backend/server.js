// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// ✅ Import routes
const routes = require("./routes");

// ✅ Use routes
app.use("/api", routes);

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/rbacDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});