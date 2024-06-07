require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Routes import
const userRoutes = require("./api/routes/user");
const cors = require("./cors");
const error = require("./error");

// Initialize the Express app
const app = express();

// Database connection
const db = process.env.DATABASE_URL;
console.log("Database URL:", db); // Log the database URL to verify it

mongoose.set("strictQuery", false);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true }) // Add options to avoid deprecation warnings
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => console.log("Error connecting to database:", err));

// Body Parser middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle CORS and routes
app.use(cors);
app.use("/user", userRoutes);
app.use(error);

module.exports = app;
