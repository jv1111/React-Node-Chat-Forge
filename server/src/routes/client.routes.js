const express = require("express");

const router = express.Router();

const { validateCreateClient } = require("../middleware/validation.middleware");
const { authenticateClient } = require("../middleware/clientAuth.middleware");

const {
  createClient,
  getClients,
  getAvailableClients,
  findClientByExternalUserId,
} = require("../controllers/client.controller");

router.post("/", validateCreateClient, createClient);
router.get("/", getClients);
router.get("/available", authenticateClient, getAvailableClients);
router.get("/lookup", findClientByExternalUserId);

module.exports = router;
