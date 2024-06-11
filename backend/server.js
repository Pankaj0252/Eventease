const http = require("http");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Eventease",
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const userRoutes = require("./api/routes/user");

// Use routes
app.use("/user", userRoutes);

// Start server
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
