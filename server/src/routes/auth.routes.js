const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");
const { register, login, me } = require("../controllers/auth.controller");

const {
  validateRegister,
  validateLogin,
} = require("../middleware/validation.middleware");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", authenticate, me);

module.exports = router;
