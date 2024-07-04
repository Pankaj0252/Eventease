const express = require("express");
const router = express.Router();
const userRoutes = require("../routes/user.routes");
const eventRoutes = require("../routes/event.routes");
const contactRoutes = require("../routes/contact.routes");
const feedbackRoutes = require("../routes/feedback.routes");

router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/contacts", contactRoutes);
router.use("/feedback", feedbackRoutes);

module.exports = router;
