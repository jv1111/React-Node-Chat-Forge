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

  const conversation = await conversationService.findOrCreateConversation(
    projectId,
    sender._id,
    receiver._id,
  );

  const message = await Message.create({
    conversation: conversation._id,
    sender: sender._id,
    content,
  });

  await message.populate("sender", "firstName middleName lastName");

  return {
    conversation,
    message,
  };
};

const getConversationMessages = async ({
  conversationId,
  limit = 10,
  before,
}) => {
  console.log("SERVICE");
  console.log({ conversationId, limit, before });

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

  console.log("Returned:", messages.length);

  return messages.reverse();
};

module.exports = {
  sendMessage,
  getConversationMessages,
};
