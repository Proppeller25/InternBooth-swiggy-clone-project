const { required } = require('joi')
// const helmet = require('helmet')
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, default: "central Abuja" },
  city: { type: String, default: "Abuja" },
  state: String,
  country: { type: String, default: "Nigeria" }
}, { _id: false }); // don't create an _id for subdocument

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  priceRange: {
    type: String,      // e.g., "₦20,000-40,000 for 2"
    required: true
  },
  // Optional numeric min/max for filtering
  priceMin: Number,
  priceMax: Number,
  address: {
    type: addressSchema,
    required: true
  },
  distance: String,    // e.g., "~4.7km from centre"
  tableBooking: {
    type: Boolean,
    required: true
  },
  cuisines: [String],  // array of strings
  phone: String,
  // Remove menu field – use separate Menu model with restaurantId
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);

// // Route definition
// app.get('/api/restaurants/:restaurantId/menus', async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const menus = await Menu.find({ restaurantId }); // restaurantId is an array, so this finds any menu that includes that ID
//     res.json(menus);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });