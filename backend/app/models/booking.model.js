var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var bookingSchema = Schema(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        bookingDate: {
            type: Date,
            default: Date.now
        },

    }, { timestamps: true });

var Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
