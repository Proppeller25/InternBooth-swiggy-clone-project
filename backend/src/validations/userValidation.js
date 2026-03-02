const Joi = require('joi')

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required().min(6).max(60).email({tlds: {allow: ['com', 'net']}}),
  password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object ({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

const acceptCodeSchema = Joi.object({
  email: Joi.string().email().required().min(6).max(60).email({tlds: {allow: ['com', 'net']}}),
  providedCode: Joi.number().required()
})

module.exports = {registerSchema, loginSchema, acceptCodeSchema}