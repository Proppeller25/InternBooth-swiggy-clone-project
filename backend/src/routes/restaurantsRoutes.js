const express = require ('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const auth = require('../middleware/auth')

router.post('/registerRestaurant', restaurantController.registerRestaurant)
router.get('/restaurants', restaurantController.getRestaurants)
router.get('/restaurantsById', restaurantController.getRestaurantsById)

module.exports = router
