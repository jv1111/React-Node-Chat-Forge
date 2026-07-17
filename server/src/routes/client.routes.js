const express = require("express");

const router = express.Router();

const { validateCreateClient } = require("../middleware/validation.middleware");

const {
  createClient,
  getClients,
} = require("../controllers/client.controller");

router.post("/", validateCreateClient, createClient);
router.get("/", getClients);

module.exports = router;
