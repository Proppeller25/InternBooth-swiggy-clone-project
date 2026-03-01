const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const {registerSchema, LoginSchema, loginSchema} = require('../validations/userValidation')


router.post('/signUp', validate(registerSchema), userController.registerUser)
router.delete('/deleteUser/:id', auth, userController.deleteUser)
router.post('/login', validate(loginSchema), userController.getUser)
router.get('/users',auth, userController.getAllUsers)

module.exports = router