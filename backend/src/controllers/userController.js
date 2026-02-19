const User = require('../models/user')
const bcrypt = require ('bcrypt')


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
    const {id} = req.body
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
    res.status(200).json ({message: 'Login Successful...', foundUser})
  }
  catch (err){
    res.status(500).json({error: err.message})
    console.log(req.body)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    if (!users){
      res.status(404).json({message})
    }
    res.status(200).json({message: 'found users:', users})
  }
  catch (err){
    res.status(500).json({error: err.message})
  }
}


module.exports = {registerUser, deleteUser, getUser, getAllUsers}