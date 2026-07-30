const Conversation = require("../models/conversation.model");
const projectService = require("./project.service");

const findConversation = async (projectId, participants) => {
  return Conversation.findOne({
    project: projectId,
    participants: {
      $all: participants,
    },
  });
};

const createConversation = async (projectId, participants) => {
  return Conversation.create({
    project: projectId,
    participants,
  });
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

const getConversation = async (projectId, participants) => {
  return Conversation.findOne({
    project: projectId,
    participants: {
      $all: participants,
    },
  });
};

module.exports = {
  findConversation,
  createConversation,
  getClientConversations,
  getConversation,
};
