const Event = require('./events-model')

const getAllEvents = async () => {
  try {
    const events = await Event.find()
    return events
  } catch (error) {
    throw error
  }
}

const getEventById = async eventId => {
  try {
    const event = await Event.findById(eventId)

    if (!event) {
      throw Error('Event not found')
    }

    return event
  } catch (error) {
    throw error
  }
}

const createEvent = async eventData => {
  try {
    const newEvent = await Event.create(eventData)
    return newEvent
  } catch (error) {
    throw error
  }
}

const updateEvent = async (eventId, eventData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        eventData,
        { new: true }
    )

    if(!updatedEvent){
        throw Error("Event Not Found")
    }

    return updatedEvent
  } catch (error) {
    throw error
  }
}

const deleteEvent = async (eventId) => {
    try {
        const eventToDelete = await Event.findByIdAndDelete(eventId);

        if(!eventToDelete){
            throw Error("Event not found")
        }

        return eventToDelete
    } catch (error) {
        throw error
    }
}

module.exports = { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent }
