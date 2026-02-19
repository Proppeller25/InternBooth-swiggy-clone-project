const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a dish name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters'],
      unique: true
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be positive'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: {
        values: [
          'Soups',
          'Swallows',
          'Rice Dishes',
          'Snacks',
          'Grilled & Fried',
          'Drinks',
          'Desserts',
        ],
        message: 'Please select a valid category',
      },
    },
    image: {
      type: String,
      default: 'default-menu.jpg',
    },
    ingredients: {
      type: [String],
      default: [],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    spicyLevel: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    preparationTime: {
      type: Number, // in minutes
      min: 0,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Menu', MenuSchema);

// const sampleMenuItems = [
//   ,
//   {
//     "name": "Suya",
//     "description": "Spicy grilled beef skewers coated with ground peanut and suya spice. Served with sliced onions, tomatoes, and fresh cabbage.",
//     "price": 8.99,
//     "category": "Grilled & Fried",
//     "image": "/uploads/suya.jpg",
//     "ingredients": ["Beef sirloin", "Suya spice", "Ground peanuts", "Vegetable oil", "Onions", "Cabbage"],
//     "isAvailable": true,
//     "spicyLevel": 5,
//     "preparationTime": 20
//   },
//   {
//     "name": "Puff Puff",
//     "description": "Soft, deep-fried dough balls lightly dusted with sugar. A popular Nigerian street snack.",
//     "price": 3.50,
//     "category": "Snacks",
//     "image": "/uploads/puff-puff.jpg",
//     "ingredients": ["Flour", "Yeast", "Sugar", "Nutmeg", "Vegetable oil", "Water"],
//     "isAvailable": true,
//     "spicyLevel": 0,
//     "preparationTime": 25
//   },
//   {
//     name: "Zobo Drink",
//     description: "Chilled hibiscus tea infused with ginger, pineapple, and cloves. Refreshing and naturally caffeine-free.",
//     price: 2.99,
//     category: "Drinks",
//     image: "/uploads/zobo.jpg",
//     ingredients: ["Hibiscus leaves", "Ginger", "Pineapple", "Cloves", "Sugar"],
//     isAvailable: true,
//     spicyLevel: 0,
//     preparationTime: 10
//   },
//   {
//     name: "Moi Moi",
//     description: "Steamed bean pudding made from peeled black-eyed peas, mixed with onions, peppers, and optional fish or egg.",
//     price: 4.99,
//     category: "Swallows", // or could be a standalone dish, but we'll put in Swallows as it's often eaten with other things
//     image: "/uploads/moi-moi.jpg",
//     ingredients: ["Black-eyed peas", "Onions", "Red bell pepper", "Scotch bonnet", "Crayfish", "Vegetable oil", "Egg (optional)"],
//     isAvailable: true,
//     spicyLevel: 2,
//     preparationTime: 60
//   },
//   {
//     name: "Fried Rice with Coleslaw",
//     description: "Nigerian-style fried rice with mixed vegetables, liver, and spices. Served with fresh coleslaw and grilled chicken.",
//     price: 14.99,
//     category: "Rice Dishes",
//     image: "/uploads/fried-rice.jpg",
//     ingredients: ["Rice", "Carrots", "Green beans", "Peas", "Liver", "Onions", "Curry powder", "Thyme", "Chicken"],
//     isAvailable: true,
//     spicyLevel: 1,
//     preparationTime: 30
//   },
//   {
//     name: "Chin Chin",
//     description: "Crunchy fried dough snacks slightly sweetened. Perfect for munching anytime.",
//     price: 2.50,
//     category: "Desserts",
//     image: "/uploads/chin-chin.jpg",
//     ingredients: ["Flour", "Sugar", "Butter", "Milk", "Nutmeg", "Vegetable oil"],
//     isAvailable: true,
//     spicyLevel: 0,
//     preparationTime: 20
//   },
//   {
//     name: "Pepper Soup (Catfish)",
//     description: "Spicy broth with tender catfish, flavored with traditional herbs. A light, warming dish often served as appetizer.",
//     price: 11.99,
//     category: "Soups",
//     image: "/uploads/pepper-soup.jpg",
//     ingredients: ["Catfish", "Pepper soup spice", "Scotch bonnet", "Ginger", "Garlic", "Onions", "Scent leaf"],
//     isAvailable: true,
//     spicyLevel: 5,
//     preparationTime: 25
//   },
//   {
//     name: "Akara with Pap (Ogi)",
//     description: "Deep-fried bean cakes served with smooth, fermented corn pudding. A classic Nigerian breakfast.",
//     price: 5.99,
//     category: "Snacks",
//     image: "/uploads/akara.jpg",
//     ingredients: ["Black-eyed peas", "Onions", "Pepper", "Salt", "Corn", "Sugar"],
//     isAvailable: true,
//     spicyLevel: 1,
//     preparationTime: 30
//   }
// ];

// module.exports = sampleMenuItems;