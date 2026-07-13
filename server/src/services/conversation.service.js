const Conversation = require("../models/conversation.model");

const findOrCreateConversation = async (projectId, senderId, receiverId) => {
  let conversation = await Conversation.findOne({
    project: projectId,
    participants: {
      $all: [senderId, receiverId],
    },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      project: projectId,
      participants: [senderId, receiverId],
    });
  }

  return conversation;
};

module.exports = {
  findOrCreateConversation,
};
