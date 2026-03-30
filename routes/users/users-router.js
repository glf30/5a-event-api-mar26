const express = require('express')
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('./users-controller')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.json({
      message: 'success',
      payload: users
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
    const user = await getUserById(req.params.id)
    res.json({
      message: 'success',
      payload: user
    })
  } catch (error) {
    res.status(404).json({
      message: 'failure',
      payload: "Cannot get user by ID"
    })
  }
})

router.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req.body)
    res.json({
      message: 'success',
      payload: newUser
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
    const updatedUser = await updateUser(req.params.id, req.body)
    res.json({
      message: 'success',
      payload: updatedUser
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
    const userToDelete = await deleteUser(req.params.id);
    res.json({
        message: "success",
        payload: `${userToDelete.username} has been removed from the database.`
    })
  } catch (error) {
    res.status(404).json({
      message: 'failure',
      payload: error.message
    })
  }
})

module.exports = router
