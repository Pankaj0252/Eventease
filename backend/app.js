require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import cors
const error = require("./error");

// Routes import
const userRoutes = require("./api/routes/user");
const eventsRoute = require("./api/routes/events");

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

// Middleware setup
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware

// Handle routes
app.use("/user", userRoutes);
app.use("/events", eventsRoute);
app.use(error);

module.exports = app;
