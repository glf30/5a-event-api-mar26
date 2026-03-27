const { getEventById, updateEvent } = require("../events/events-controller");
const Booking = require("./bookings-model");

const createBooking = async (bookingData) => {
    /*
    bookingData = {
        user: sdnasodmoask
        event: askdmsadmoasdm
        quantity: 4
        status: "confirmed"
    }

    event = {
        "title": "MongoDB Conference 2026",
        "description": "Learn all about how NoSQL is changing in 2026",
        "date": "2026-05-03T04:00:00.000Z",
        "location": "NYC",
        "category": "conference",
        "price": 0,
        "availableTickets": 100,
    }

    */
    try {
        // create booking
        
        // 1. calculate total price
        // totalPrice = eventPrice * quantity
        // event - eventPrice (bookingdata.event)
        // quantity - bookingData  
        const event = await getEventById(bookingData.event);

        const totalPrice = bookingData.quantity * event.price;
        // add our totalPrice calculation to our incoming bookingData object
        bookingData.totalPrice = totalPrice;

        // 2. decrease available tickets from event
        // calculate tickets available
        // 
        const newAvailableTickets = event.availableTickets - bookingData.quantity;

        // update event with the new amount of tickets
        // only need to update ticket amount, we don't need a variable for the event data
        await updateEvent(bookingData.event, { availableTickets: newAvailableTickets })

        const booking = await Booking.create(bookingData);
        return booking;

    } catch (error) {
        throw error;
    }
}

module.exports = { createBooking }