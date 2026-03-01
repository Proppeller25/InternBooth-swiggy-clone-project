const userService = require('../services/userService');
const { userDTO, usersDTO } = require('../dtos/userDTO');

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
    res.json({ message: 'Login successful', token, user: userDTO(user) });
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
    const users = await userService.getAllUsers();
    res.json({ users: usersDTO(users) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, getUser, deleteUser, getAllUsers };