const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const authConfig = require('../config/auth.config');

const login = async (email, password) => {
  const user = await userModel.findUserByEmail(email);
  if (!user) {
    throw new Error('User not found');
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400, // 24 hours
  });

  return token;
};

const register = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 8);
  userData.password = hashedPassword;
  const user = await userModel.createUser(userData);
  return user;
};

module.exports = {
  login,
  register,
};
