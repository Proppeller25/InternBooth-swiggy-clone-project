const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const cookieParser = require('cookie-parser')

require('dotenv').config()

const app= express()
app.use(helmet())
app.use(express.json())
// app.use(mongoSanitize())
app.use(cors({origin:'http://localhost:3001'}))
app.use(cookieParser())


app.use((req, res, next) => {
  if (req.body) req.body = mongoSanitize.sanitize(req.body);
  if (req.query) req.query = mongoSanitize.sanitize(req.query);
  if (req.params) req.params = mongoSanitize.sanitize(req.params);
  next();
});
app.disable('x-powered-by')



const userRoutes = require ('./src/routes/userRoutes')
const menuRoutes = require('./src/routes/menuRoutes')
const restaurantRoutes = require('./src/routes/restaurantsRoutes')
app.use('/swiggy', userRoutes)
app.use('/swiggy', menuRoutes)
app.use('/swiggy', restaurantRoutes)

const requiredEnv = ['MONGO_URI', 'JWT_SECRET', 'ADMIN_API_KEY'];
requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`FATAL ERROR: ${key} is not defined.`);
    process.exit(1);
  }
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch (error => console.log('Error:', error))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is now running on ${PORT}`))