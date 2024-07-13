// controllers/auth.controller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const userModel = require('../models/user.model');
const connection = require("../config/db.config.js")

exports.signup = async (req, res) => {

  console.log(req.body);
  // const {  } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO UNIT (UNIT_NAME, EMAIL, CONTACT, ADDRESS, UNIT_PASSWORD) VALUES (:name, :email, :contact, :addr, :pass)`
    const db = connection();

    // const res = await db.execute(sql, {
    //   name: 
    // })


    // const newUser = await userModel.createUser({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
