const Joi = require('joi');

const menuSchema = Joi.object({
  restaurantId: Joi.array().items(Joi.string().hex().length(24)).min(1).required(),
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid(
    'Soups', 'Swallows', 'Rice Dishes', 'Snacks',
    'Grilled & Fried', 'Drinks', 'Desserts'
  ).required(),
  ingredients: Joi.array().items(Joi.string()),
  isAvailable: Joi.boolean(),
  spicyLevel: Joi.number().min(0).max(5),
  preparationTime: Joi.number().min(0),
});

module.exports = { menuSchema };