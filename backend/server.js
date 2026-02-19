const express = require ('express')
const mongoose = require ('mongoose')
const cors = require('cors')

require('dotenv').config()

const app= express()
app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))



const userRoutes = require ('./src/routes/userRoutes')
const menuRoutes = require('./src/routes/menuRoutes')
app.use('/data', userRoutes)
app.use('/swiggy', menuRoutes)



mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch (error => console.log('Error:', error))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is now running on ${PORT}`))