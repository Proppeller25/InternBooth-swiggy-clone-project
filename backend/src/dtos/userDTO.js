const userDTO = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
});

const usersDTO = (users) => users.map(userDTO);

module.exports = { userDTO, usersDTO };