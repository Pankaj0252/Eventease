const router = require("express").Router();
const bookingController = require("../controllers/booking.controller");

router.post("/", bookingController.create);

module.exports = router;

