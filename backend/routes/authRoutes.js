const express = require("express");
const router = express.Router();
const {
  createNewUser,
  login,
  logout,
} = require("../controllers/authController");

router.post("/register", createNewUser);
router.post("/login", login);

module.exports = router;
