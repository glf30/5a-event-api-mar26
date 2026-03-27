const express = require('express')
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent
} = require('./events-controller')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const events = await getAllEvents()
    res.json({
      message: 'success',
      payload: events
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const event = await getEventById(req.params.id)
    res.json({
      message: 'success',
      payload: event
    })
  } catch (error) {
    res.status(404).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newEvent = await createEvent(req.body)
    res.json({
      message: 'success',
      payload: newEvent
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body)
    res.json({
      message: 'success',
      payload: updatedEvent
    })
  } catch (error) {
    res.status(404).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const eventToDelete = await deleteEvent(req.params.id);
    res.json({
        message: "success",
        payload: `${eventToDelete.eventname} has been removed from the database.`
    })
  } catch (error) {
    res.status(404).json({
      message: 'failure',
      payload: error.message
    })
  }
})

module.exports = router
