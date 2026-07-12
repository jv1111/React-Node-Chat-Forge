const express = require("express");

const router = express.Router();

const { createClient } = require("../controllers/client.controller");

router.post("/", createClient);

module.exports = router;
