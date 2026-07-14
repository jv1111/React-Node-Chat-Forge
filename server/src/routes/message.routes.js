const express = require("express");

const router = express.Router();

const {
  sendMessage,
  getConversationMessages,
} = require("../controllers/message.controller");

router.post("/", sendMessage);
router.get("/conversations/:conversationId", getConversationMessages);

module.exports = router;
