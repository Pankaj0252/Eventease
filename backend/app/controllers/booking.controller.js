const bookingService = require("../services/booking.service");
const bookingController = {};
const { sendError } = require('../utils/errors.utils');

bookingController.create = async function (req, res, next) {
    const { eventId, userId } = req.body;
    const body = req.body;

    try {
        // Check if the booking already exists
        const existingBooking = await bookingService.bookingData(eventId, userId);
        console.log('exist---------', existingBooking);

        if (existingBooking) {
            // return res.status(400).json({ success: false, message: 'Event already booked by this user' });
            return sendError(res, 'Event already booked by this user');
        }
        const response = await bookingService.create({
            userId,
            eventId,
            ...body
        });

        console.log('response--------', response);
        res.json({ data: response, success: true });
    } catch (error) {
        console.log(error);
        // res.status(500).json({ success: false, message: 'Failed to create booking' });
        return sendError(res, 'Failed to create booking');
    }
};

module.exports = bookingController;



