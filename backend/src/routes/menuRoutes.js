const express = require ('express')
const router = express.Router()
const menuController = require('../controllers/menuController')
const apiKey = require('../middleware/apiKey')



router.get('/fullMenu', menuController.getMenu)
router.post('/register', apiKey, menuController.registerFood)

module.exports = router