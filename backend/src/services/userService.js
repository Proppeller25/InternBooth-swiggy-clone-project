const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (userData) => {
  // Business rule: email must be unique
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error('Email already registered');

  const user = new User(userData);
  await user.save();
  return user;
};

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { user: { id: user._id, username: user.username, email: user.email } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return { token, user };
};

const deleteUserById = async (userId, requestingUserId, isAdmin) => {
  if (!isAdmin && userId !== requestingUserId) {
    throw new Error('You are not allowed to delete this user');
  }
  const deleted = await User.findByIdAndDelete(userId);
  if (!deleted) throw new Error('User not found');
  return deleted;
};

const getAllUsers = async () => {
  return await User.find();
};

module.exports = {
  createUser,
  authenticateUser,
  deleteUserById,
  getAllUsers,
};