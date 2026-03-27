const mongoose = require("mongoose");

/*
user (reference to User)
event (reference to Event)
quantity (number)
totalPrice (calculated from event price and quantity)
status ("confirmed", "cancelled")

*/

const ObjectId = mongoose.Schema.Types.ObjectId;

const bookingSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    event: {
        type: ObjectId,
        ref: "Event",
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true
    },
    totalPrice: {
        type: Number
    },
    status: {
        type: String,
        default: "confirmed"
    }
}, {
    timestamps: true
})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking