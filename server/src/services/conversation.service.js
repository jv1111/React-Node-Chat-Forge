const Conversation = require("../models/conversation.model");
const projectService = require("./project.service");

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

const getClientConversations = async (projectCode, clientId) => {
  const project = await projectService.findByProjectCode(projectCode);

  return await Conversation.find({
    project: project._id,
    participants: clientId,
  })
    .populate("participants", "firstName middleName lastName")
    .sort({ updatedAt: -1 });
};

module.exports = {
  findOrCreateConversation,
  getClientConversations,
};
