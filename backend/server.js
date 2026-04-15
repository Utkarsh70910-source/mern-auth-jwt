// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const routes = require("./routes");

// Use routes
app.use("/api", routes);

// ✅ MongoDB connection (USE ENV VARIABLE)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ✅ Root route (important for Render)
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ FIX PORT FOR RENDER
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});