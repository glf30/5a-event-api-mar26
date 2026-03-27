const express = require('express');
const logger = require("morgan");

const connectToMongoDB = require("./database/connectToMongoDB")

const app = express();

const PORT = 3000;

app.use(logger("dev"))
app.use(express.json())

const usersRouter = require("./routes/users/users-router");
app.use("/api/v1/users", usersRouter)

const eventsRouter = require("./routes/events/events-router");
app.use("/api/v1/events", eventsRouter)

const bookingsRouter = require("./routes/bookings/bookings-router");
app.use("/api/v1/bookings", bookingsRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on Port: ${PORT}`)
    connectToMongoDB()
})