const projectService = require("../services/project.service");
const conversationService = require("../services/conversation.service");

const getClientConversations = async (req, res) => {
  try {
    const { projectCode, clientId } = req.params;

    const conversations = await conversationService.getClientConversations(
      projectCode,
      clientId,
    );

    return res.status(200).json({
      success: true,
      data: conversations,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getConversation = async (req, res) => {
  try {
    const { participants } = req.body;

    console.log("\n==================================================");
    console.log("           GET CONVERSATION REQUEST");
    console.log("==================================================");
    console.log("Client ID:    ", req.client.id);
    console.log("Project ID:   ", req.client.projectId);
    console.log("Participants: ", participants);
    console.log("==================================================\n");

    const conversation = await conversationService.getConversation(
      req.client.projectId,
      [req.client.id, ...participants],
    );

    return res.status(200).json({
      success: true,
      data: conversation,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getClientConversations,
  getConversation,
};
