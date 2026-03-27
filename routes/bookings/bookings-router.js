const express = require("express");
const { createBooking } = require("./bookings-controller");
const router = express.Router();

router.post("/", async (req,res) => {
    try {
        const booking = await createBooking(req.body);
        res.json({
            message: "success",
            payload: booking
        })
    } catch (error) {
        res.status(500).json({
            message: "failure",
            payload: error.message
        })
    }
})

module.exports = router