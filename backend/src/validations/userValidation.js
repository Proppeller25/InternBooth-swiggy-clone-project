const Joi = require('joi')
const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required().min(6).max(60).email({tlds: {allow: ['com', 'net']}}).messages({
    "string.email": "enter a valid email"
  }),
  password: Joi.string().min(6).required().pattern(regex).messages({
    "string.pattern.base": "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)"
  }),
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