const {StatusCodes} = require('http-status-codes');
const {BookingService} = require('../services/index');
const { createChannel, publishMessage } = require("../utils/message_queue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");


const bookingService = new BookingService();

class BookingController {
    constructor() {

    }

    async sendMessageToQueue (req, res) {
        const channel = await createChannel();
        const payload = {
            data: {
                subject: "this is a notification from queue",
                content: "Changed the sendMail content to text",
                recepientEmail: "wbriyaz75@gmail.com",
                notificationTime: '2023-09-18T06:30:00'
            },
            service: 'CREATE_TICKET'
        }
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(200).json({
            message: "Successfully published the event"
        })
    }

    async create (req, res) {
        try {
            const response = await bookingService.createBooking(req.body);
            console.log("from booking controller: ", response);
            return res.status(StatusCodes.OK).json({
                success: true,
                message: 'Successfully booked ticket',
                data: response,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            });
        }
    }   
}

module.exports = BookingController;