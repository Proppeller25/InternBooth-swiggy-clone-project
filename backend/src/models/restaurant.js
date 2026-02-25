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

// [
//   ,
//   ,
//   {
//     "name": "Mambaah Cafe",
//     "rating": 4.3,
//     "priceRange": "₦8,000-20,000 for 2",
//     "priceMin": 8000,
//     "priceMax": 20000,
//     "address": { "city": "Abuja", "street": "Ibrahim Babangida Way, Maitama" },
//     "distance": "Maitama",
//     "tableBooking": true,
//     "cuisines": ["Cafe", "Light Meals"],
//     "phone": ""
//   },
//   {
//     "name": "The Pasha",
//     "rating": 4.5,
//     "priceRange": "₦30,000-50,000 for 2",
//     "priceMin": 30000,
//     "priceMax": 50000,
//     "address": { "city": "Abuja", "street": "Maitama" },
//     "distance": "Maitama",
//     "tableBooking": true,
//     "cuisines": ["Mediterranean"],
//     "phone": ""
//   },
//   {
//     "name": "A Class Restaurant",
//     "rating": 4.2,
//     "priceRange": "₦20,000-40,000 for 2",
//     "priceMin": 20000,
//     "priceMax": 40000,
//     "address": { "city": "Abuja", "street": "Kashim Ibrahim Way, Maitama" },
//     "distance": "Maitama",
//     "tableBooking": true,
//     "cuisines": ["Fusion"],
//     "phone": ""
//   },
//   {
//     "name": "Coffee Bar",
//     "rating": 4.4,
//     "priceRange": "₦6,000-16,000 for 2",
//     "priceMin": 6000,
//     "priceMax": 16000,
//     "address": { "city": "Abuja", "street": "Wuse 2" },
//     "distance": "Wuse 2",
//     "tableBooking": false,
//     "cuisines": ["Coffee", "Light Bites"],
//     "phone": ""
//   },
//   {
//     "name": "Kebabs & Kurries",
//     "rating": 4.3,
//     "priceRange": "₦14,000-30,000 for 2",
//     "priceMin": 14000,
//     "priceMax": 30000,
//     "address": { "city": "Abuja", "street": "Wuse 2" },
//     "distance": "Wuse 2",
//     "tableBooking": true,
//     "cuisines": ["Indian", "Chinese", "Nigerian"],
//     "phone": "+2349090999993"
//   },
//   {
//     "name": "Astro Diner",
//     "rating": 4.2,
//     "priceRange": "₦12,000-28,000 for 2",
//     "priceMin": 12000,
//     "priceMax": 28000,
//     "address": { "city": "Abuja", "street": "Abuja" },
//     "distance": "Multiple areas",
//     "tableBooking": true,
//     "cuisines": ["Oxtail Pasta", "Continental"],
//     "phone": "09135688888"
//   },
//   {
//     "name": "The Fulani Bar",
//     "rating": 4.4,
//     "priceRange": "₦16,000-40,000 for 2",
//     "priceMin": 16000,
//     "priceMax": 40000,
//     "address": { "city": "Abuja", "street": "Transcorp Hilton" },
//     "distance": "Central",
//     "tableBooking": true,
//     "cuisines": ["Poolside", "Cocktails"],
//     "phone": "08039013000"
//   },
//   {
//     name: "355 Steakhouse & Lounge",
//     rating: 4.5,
//     priceRange: "₦40,000-60,000+ for 2",
//     priceMin: 40000,
//     priceMax: 60000,
//     address: { city: "Abuja", street: "Maitama" },
//     distance: "Maitama",
//     tableBooking: true,
//     cuisines: ["Mexican", "Steakhouse"],
//     phone: ""
//   },
//   {
//     name: "Kapadoccia Abuja",
//     rating: 4.2,
//     priceRange: "₦50,000-80,000 for 2",
//     priceMin: 50000,
//     priceMax: 80000,
//     address: { city: "Abuja", street: "Wuse 2" },
//     distance: "Wuse 2",
//     tableBooking: true,
//     cuisines: ["Turkish", "Mediterranean"],
//     phone: ""
//   },
//   {
//     name: "Chez Victor",
//     rating: 4.2,
//     priceRange: "₦50,000-80,000 for 2",
//     priceMin: 50000,
//     priceMax: 80000,
//     address: { city: "Abuja", street: "Maitama" },
//     distance: "Maitama",
//     tableBooking: true,
//     cuisines: ["French", "African"],
//     phone: ""
//   },
//   {
//     name: "Niger Delta Restaurant",
//     rating: 4.1,
//     priceRange: "₦5,000-9,000 for 2",
//     priceMin: 5000,
//     priceMax: 9000,
//     address: { city: "Abuja", street: "City Park, Wuse" },
//     distance: "Wuse",
//     tableBooking: true,
//     cuisines: ["Niger-Delta", "Fisherman Soup"],
//     phone: ""
//   },
//   {
//     name: "Shiro Lagos",
//     rating: 4.8,
//     priceRange: "₦50,000-130,000 for 2",
//     priceMin: 50000,
//     priceMax: 130000,
//     address: { city: "Lagos", street: "Victoria Island" },
//     distance: "VI",
//     tableBooking: true,
//     cuisines: ["Japanese", "Pan-Asian"],
//     phone: ""
//   },
//   {
//     name: "Nok by Alara",
//     rating: 3.8,
//     priceRange: "₦60,000-170,000 for 2",
//     priceMin: 60000,
//     priceMax: 170000,
//     address: { city: "Lagos", street: "12A Akin Olugbade St, VI" },
//     distance: "Victoria Island",
//     tableBooking: true,
//     cuisines: ["Modern African"],
//     phone: ""
//   },
//   {
//     name: "1415 Steakhouse",
//     rating: 4.2,
//     priceRange: "₦70,000-120,000 for 2",
//     priceMin: 70000,
//     priceMax: 120000,
//     address: { city: "Lagos", street: "Eko Hotel & Suites, VI" },
//     distance: "VI",
//     tableBooking: true,
//     cuisines: ["Italian", "Steakhouse"],
//     phone: ""
//   },
//   {
//     name: "Rococo Restaurant",
//     rating: 5.0,
//     priceRange: "₦80,000 for 2",
//     priceMin: 80000,
//     priceMax: 80000,
//     address: { city: "Lagos", street: "Victoria Island" },
//     distance: "VI",
//     tableBooking: true,
//     cuisines: ["French", "Asian", "Nigerian", "Mediterranean"],
//     phone: ""
//   },
//   {
//     name: "The House Lagos",
//     rating: 4.5,
//     priceRange: "₦40,000 for 2",
//     priceMin: 40000,
//     priceMax: 40000,
//     address: { city: "Lagos", street: "4 A.J. Marinho Dr, VI" },
//     distance: "Victoria Island",
//     tableBooking: true,
//     cuisines: ["Ofada rice bowl", "Meat platter"],
//     phone: ""
//   },
//   {
//     name: "HSE Gourmet",
//     rating: 4.3,
//     priceRange: "₦20,000-80,000 for 2",
//     priceMin: 20000,
//     priceMax: 80000,
//     address: { city: "Lagos", street: "25 Babatope Bejide Cres, Lekki" },
//     distance: "Lekki Phase 1",
//     tableBooking: true,
//     cuisines: ["International", "Asian-fusion"],
//     phone: ""
//   }
// ];