// userRoutes.js

const express = require('express');
const router = express.Router();
const {getUsers,registerUser,login} =require('../controllers/accountController')

// Middleware function
router.use((req, res, next) => {
  // Your middleware logic
  next();
});

// Route endpoints
router.get("/getusers", getUsers);
router.post("/signup", registerUser)
router.post("/login", login)

module.exports = router;
