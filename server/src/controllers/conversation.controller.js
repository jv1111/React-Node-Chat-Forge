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

module.exports = {
  getClientConversations,
};
