const Menu = require('../models/Menu')

const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find()
    if (!menu){
      res.status(404).json({message: "Can't find menu"})
    }
    res.status(200).json({messgae: "Found Menu", menu}) 
  }
  catch (error){
    res.status(500).json({error: err.message})
  }
}

const registerFood = async (req, res) => {
  try {
    const {
        name,
        description,
        price,
        category,
        ingredients,
        isAvailable,
        spicyLevel,
        preparationTime
      } = req.body;

    const newFood = new Menu({
      name,
      description,
      price,
      category,
      ingredients,
      isAvailable,
      spicyLevel,
      preparationTime
  })
  await newFood.save()
  res.status(200).json({ message: 'food registered successfully' })
  console.log(newMenu)
  }
    catch (error) {
      if (error.code = 11000) {
        return res.status(400).json({ error: 'Food already exists'});
      }
      res.status(500).json({ error: error.message })
    }
}

module.exports = {getMenu, registerFood}