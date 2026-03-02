const userService = require('../services/userService');
const { userDTO, usersDTO } = require('../dtos/userDTO');
const User = require('../models/User');
const transport = require('../middleware/sendMail')
const {createHmac} = require('crypto') 

const registerUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ message: 'User registered', user: userDTO(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { token, user } = await userService.authenticateUser(
      req.body.email,
      req.body.password
    );
    // res.json({ message: 'Login successful', token, user: userDTO(user) });
    res.cookie('Authorization', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(Date.now() + 1 * 3600000)
    }).json({
        success: true,
        message: 'Login Successful'
      })
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const requestingUserId = req.user._id.toString()
    const isAdmin = req.user.role === 'admin'
    const deleted = await userService.deleteUserById(
      req.params.id,
      requestingUserId,
      isAdmin
    )
    res.json({ message: 'User deleted', user: userDTO(deleted) });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'admin'
    const users = await userService.getAllUsers(isAdmin)
    res.json({ users: usersDTO(users) });
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

const signOut = async (req, res) => {
  res
  .clearCookie ('Authorization').status(200).json({
    success: true,
    message: "Logged out Successfully"
  })
}

const sendVerificationCode = async (req, res) => {
  try {
    const {email} = req.body
    const existingUser = await User.findOne({email})
    if (!existingUser){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    if (existingUser.verified){
      return res.status(400).json({
        success: false, 
        message: "You are already verified"
      })
    }

    const codeValue = Math.floor(Math.random() * 1000000).toString()
    let info = await transport.sendMail({
      from: process.env.NODE_CODE_SENDING_EMAIL_ADDRESS,
      to: existingUser.email,
      subject: "verification Code",
      html: '<h1>' + codeValue + '</h1>'
    })

    if (info.accepted.includes(existingUser.email)){
        const hashedCodeValue = createHmac('sha256', process.env.HMAC_VARIFICATION_CODE).update(codeValue).digest('hex')
        existingUser.verificationCode = hashedCodeValue
        existingUser.codeValidation = Date.now()
        await existingUser.save()
        return res.status(200).json({
          success: true,
          message: "Code sent!"
        })
    }
    res.status(400).json({
      success:false,
      message: "Code not sent!"
    })
  }
  catch(error) {
    res.status(500).json({ error: error.message })
  }
}

const verifyCode = async (req, res) => {
  const {email, providedCode} = req.body
  try {
    const codeValue = providedCode.toString() 
    const existingUser = await User.findOne({email}).select("+verificationCode +codeValidation")
    if (!existingUser){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    if (existingUser.verified) {
      return res.status(400).json({
        success: false,
        message:"You are already verified "
      })
    }

    if (!existingUser.verificationCode || !existingUser.codeValidation){
      return res.status(400).json({
        success:false,
        message:"Something is wrong with the code"
      })
    }

    if (Date.now() - existingUser.codeValidation > 5 * 60 * 1000) {
      return res.status(400).json({
        success: false,
        message:"code has expired"
      })
    }

    const hashedCodeValue = createHmac('sha256', process.env.HMAC_VARIFICATION_CODE).update(codeValue).digest('hex')
    if (hashedCodeValue === existingUser.verificationCode ){
      existingUser.verified = true
      existingUser.verificationCode = undefined
      existingUser.codeValidation = undefined
      await existingUser.save()
      return res.status(200).json({
        success:true,
        message: "Account Verified"
      })
    }

    res.status(400).json({
        success: false,
        message:"unexpected error"
      })
    
  }
  catch(error) {
    console.error(error)
  }
}

module.exports = {registerUser, getUser, deleteUser, getAllUsers, signOut, sendVerificationCode, verifyCode}