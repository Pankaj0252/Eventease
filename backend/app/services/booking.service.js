const bookingModel = require("../models/booking.model");
const bookingService = {};

bookingService.getAll = function () {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await bookingModel.find().populate('eventId', 'eventName').populate('userId', 'name');;
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

bookingService.bookingData = function (eventId, userId) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await bookingModel.findOne({ eventId, userId }).populate('eventId', 'eventName');
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

bookingService.getSingle = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await bookingModel.findById(id).populate('eventId', 'eventName');
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

bookingService.create = function (body) {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await bookingModel.create(body);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

bookingService.update = function (id, body) {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await bookingModel.findByIdAndUpdate(id, body, {
                new: true,
            });
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};

bookingService.deleteBooking = function (id) {
    return new Promise(async (resolve, reject) => {
        try {
            var response = await bookingModel.findByIdAndDelete(id);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = bookingService;
