// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// Signup
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

router.get('/signup.html',(req,res)=>{
    res.sendFile(path.join(__dirname, '/public/src/pages', 'signup.html'));
  });




module.exports = router;
