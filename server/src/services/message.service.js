const projectService = require("./project.service");
const clientService = require("./client.service");
const conversationService = require("./conversation.service");

const Message = require("../models/message.model");

const sendMessage = async ({
  projectCode,
  fromClientId,
  toClientId,
  content,
}) => {
  const project = await projectService.findByProjectCode(projectCode);

  const sender = await clientService.findById(project._id, fromClientId);

  const receiver = await clientService.findById(project._id, toClientId);

  if (sender._id.equals(receiver._id)) {
    throw new Error("A client cannot send a message to themselves.");
  }

  const conversation = await conversationService.findOrCreateConversation(
    project._id,
    sender._id,
    receiver._id,
  );

  const message = await Message.create({
    conversation: conversation._id,
    sender: sender._id,
    content,
  });

  return {
    conversation,
    message,
  };
};

module.exports = {
  sendMessage,
};
