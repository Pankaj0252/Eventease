const express = require("express");
const router = express.Router();
const Event = require("./models/event");

// POST /events - Create a new event
router.post("/events", (req, res) => {
  const newEvent = new Event({
    name: req.body.name,
    description: req.body.description,
    date: req.body.date,
  });

  newEvent
    .save()
    .then((event) => res.status(201).json({ event }))
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
