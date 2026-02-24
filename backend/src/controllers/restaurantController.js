const restaurant = require('../models/restaurant')

const registerRestaurant = async (req, res) => {

  try {
    const {
    name,
    rating,
    priceRange,
    priceMin,
    priceMax,
    address,
    distance,
    tableBooking,
    cuisines,
    phone
  } = req.body

  const newRestaurant = new restaurant({
    name,
    rating,
    priceRange,
    priceMin,
    priceMax,
    address,
    distance,
    tableBooking,
    cuisines,
    phone
  })

  await newRestaurant.save()
  res.status(201).json({message: "Restaurant registered successfully", newRestaurant})
  }
  catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await restaurant.find()
    if(!restaurants || restaurants.length === 0) {
      res.status(404).json({message: "No restaurants found"})
    }
    
    res.status(200).json({message: "Restaurants found", restaurants})
  }
  catch(error) {
    res.status(500).json({ error: error.message })
  }
  
}

module.exports = {registerRestaurant, getRestaurants}
