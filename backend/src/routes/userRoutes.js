const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')


router.post('/register', userController.registerUser)
router.delete('/delete', userController.deleteUser)
router.post('/login', userController.getUser)
router.get('/users',userController.getAllUsers)

module.exports = router