const express = require('express');
const router = express.Router();

const {BookingController} = require('../../controllers/index');

const bookingController = new BookingController();

router.post('/bookings', bookingController.create);
router.post("/publish", bookingController.sendMessageToQueue);

router.get('/info', (req, res) => {
    return res.json({
        message: 'response from routes'
    })
})

module.exports = router;