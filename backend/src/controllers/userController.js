const User = require('../models/user')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')


const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const newUser = new User({
    username,
    email,
    password
  })
  await newUser.save()
  res.status(201).json({ message: 'User registered successfully' })
  console.log(newUser)
  }
    catch (error) {
      res.status(500).json({ error: error.message })
    }
}

const deleteUser = async (req, res) => {
  try{
    const {id} = req.params
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      res.status(404).json({message: 'No User not found'})
    }

    res.status(200).json({message: 'Deleted User:', deletedUser})
  }
  catch (error){
    res.status(500).json({
      error:'failed to delete User',
      details: error.message
    })
  }

}

const getUser = async (req, res) => {
  try {
    const {email, password} = req.body
    const foundUser = await User.findOne({email})

    if(!foundUser){
      return res.status(404).json({message: 'User not found'})
    }

    const isMatch = await bcrypt.compare(password, foundUser.password)

    if(!isMatch) {
      return res.status (400).json ({message: "Password is incorrect"})
    }
    
    const payload = {
      user: {
        id: foundUser._id,
        username: foundUser.username,
        email: foundUser.email
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {expiresIn: '1h'},
      (err, token) => {
        if (err) throw err
        res.status(200).json({message: 'Login successful', token})
      }
    )
  }
  catch (err){
    res.status(500).json({error: err.message})
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users || users.length === 0){
      res.status(404).json({message: "No users found"})
    }
    res.status(200).json({message: 'found users:', users})
  }
  catch (err){
    res.status(500).json({error: err.message})
  }
}


module.exports = {registerUser, deleteUser, getUser, getAllUsers}