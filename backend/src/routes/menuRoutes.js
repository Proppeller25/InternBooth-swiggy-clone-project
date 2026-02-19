const express = require ('express')
const router = express.Router()
const menuController = require('../controllers/menuController')



router.get('/fullMenu', menuController.getMenu)
router.post('/register', menuController.registerFood)

module.exports = router