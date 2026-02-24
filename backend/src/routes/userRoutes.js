const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')


router.post('/signUp', userController.registerUser)
router.delete('/deleteUser/:id', auth, userController.deleteUser)
router.post('/login', userController.getUser)
router.get('/users',auth, userController.getAllUsers)

module.exports = router