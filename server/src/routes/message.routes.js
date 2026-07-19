const express = require("express");

const router = express.Router();

const { authenticateClient } = require("../middleware/clientAuth.middleware");

const {
  sendMessage,
  getConversationMessages,
} = require("../controllers/message.controller");

router.post("/", authenticateClient, sendMessage);
router.get("/conversations/:conversationId", getConversationMessages);

module.exports = router;
