const express = require('express');
const router = express.Router();

const {BookingController} = require('../../controllers/index');

router.post('/bookings', BookingController.create);

router.get('/info', (req, res) => {
    return res.json({
        message: 'response from routes'
    })
})

module.exports = router;