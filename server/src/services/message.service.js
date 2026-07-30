const clientService = require("./client.service");
const conversationService = require("./conversation.service");

const Message = require("../models/message.model");

const sendMessage = async ({
  projectId,
  fromClientId,
  toClientId,
  content,
}) => {
  const sender = await clientService.findById(projectId, fromClientId);

  const receiver = await clientService.findById(projectId, toClientId);

  if (sender._id.equals(receiver._id)) {
    throw new Error("A client cannot send a message to themselves.");
  }

  let conversation = await conversationService.findConversation(projectId, [
    sender._id,
    receiver._id,
  ]);

  let conversationCreated = false;

  if (!conversation) {
    conversation = await conversationService.createConversation(projectId, [
      sender._id,
      receiver._id,
    ]);

    conversationCreated = true;
  }

  const message = await Message.create({
    conversation: conversation._id,
    sender: sender._id,
    content,
  });

  await message.populate("sender", "firstName middleName lastName");

  return {
    conversation,
    message,
    conversationCreated,
  };
};

const getConversationMessages = async ({
  conversationId,
  limit = 10,
  before,
}) => {
  const query = {
    conversation: conversationId,
  };

  if (before) {
    query.createdAt = { $lt: new Date(before) };
  }

  const messages = await Message.find(query)
    .populate("sender", "firstName middleName lastName")
    .sort({ createdAt: -1 })
    .limit(limit);

  return messages.reverse();
};

module.exports = {
  sendMessage,
  getConversationMessages,
};
