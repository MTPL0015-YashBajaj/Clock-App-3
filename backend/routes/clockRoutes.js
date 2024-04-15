// clockRoutes.js

const express = require("express");
const router = express.Router();
const {
    insertClock
} = require("../controllers/clockController");

// Middleware function
router.use((req, res, next) => {
  // Your middleware logic
  next();
});

// Route endpoints
//router.get("/getusers", getUsers);
router.post("/insertclock", insertClock);
//router.post("/login", login);

module.exports = router;
