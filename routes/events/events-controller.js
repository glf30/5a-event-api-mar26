const Event = require('./events-model')

// queryData = req.query
// in router we will call getAllEvents with the query data like so:
// getAllEvents(req.query)
const getAllEvents = async queryData => {
  try {
    /*
        queryData example: 
        {
            category: "concert"    
            date: "05-10-26",
        }
     

    */
    // Object that will keep track of our filter queries
    const filterObject = {}

    // add the property to our filterObject
    if (queryData.category) {
      filterObject.category = queryData.category
    }

    if (queryData.date) {
      filterObject.date = queryData.date
    }

    // dealing with price
    // deal with a range, getting everything between minPrice and maxPrice

    // $gte - greater than or equal to
    // $lte - less than or equal to
    filterObject.price = {
      $gte: queryData.minPrice || 0, // if no min, default to 0
      $lte: queryData.maxPrice || Infinity // if no max, default to infinity
    }

    // sorting with mongodb
    // { propertyToSortBy: sortOrder }
    const sortObject = {}
    // should look something like this: { title: "desc"}
    // what do i need to set sortObject equal to in order to make ?sortBy=PROPERTY&sortOrder=ORDER 

    // sortObject[queryData.sortBy]
    // first, evaluate queryData.sortBy
    // sortObject["title"] - same as sortObject.title
    sortObject[queryData.sortBy || "_id"] = queryData.sortOrder || "asc"
    
    // example: ?date=07-10-26&category=conference - only conferences on July 10, 2026

    const events = await Event.find(filterObject).sort(sortObject)

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
    const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, {
      new: true
    })

    if (!updatedEvent) {
      throw Error('Event Not Found')
    }

    return updatedEvent
  } catch (error) {
    throw error
  }
}

const deleteEvent = async eventId => {
  try {
    const eventToDelete = await Event.findByIdAndDelete(eventId)

    if (!eventToDelete) {
      throw Error('Event not found')
    }

    return eventToDelete
  } catch (error) {
    throw error
  }
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
}
