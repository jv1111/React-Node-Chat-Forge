const express = require("express");

const router = express.Router();

const {
  getClientConversations,
} = require("../controllers/conversation.controller");

router.get("/:projectCode/:clientId", getClientConversations);

module.exports = router;
