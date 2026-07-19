const express = require("express");

const router = express.Router();

const { authenticateClient } = require("../middleware/clientAuth.middleware");

const {
  getClientConversations,
  getConversation,
} = require("../controllers/conversation.controller");

router.get("/:projectCode", authenticateClient, getClientConversations);

router.post("/find", authenticateClient, getConversation);

module.exports = router;
