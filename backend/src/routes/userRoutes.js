const express = require ('express')
const router = express.Router()
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const {registerSchema, loginSchema, acceptCodeSchema} = require('../validations/userValidation')


router.delete('/deleteUser/:id', auth, userController.deleteUser)

router.get('/users',auth, userController.getAllUsers)

router.post('/signUp', validate(registerSchema), userController.registerUser)
router.post('/login', validate(loginSchema), userController.getUser)
router.post('/logout', auth, userController.signOut)

router.patch('/sendVerCode',auth, userController.sendVerificationCode)
router.patch('/verifyCode',auth, validate(acceptCodeSchema), userController.verifyCode)

module.exports = router