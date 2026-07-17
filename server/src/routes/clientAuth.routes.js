const express = require("express");

const router = express.Router();

const { login } = require("../controllers/clientAuth.controller");

const { validateClientLogin } = require("../middleware/clientAuth.middleware");

router.post("/login", validateClientLogin, login);

module.exports = router;
