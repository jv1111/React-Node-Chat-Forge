const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const { projectId, _id: fromClientId } = req.client;
    const message = await messageService.sendMessage({
      ...req.body,
      projectId,
      fromClientId,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 10, before } = req.query;

    console.log("================ GET MESSAGES CONTROLLER ================");
    console.log("limit:", limit);
    console.log("before:", before);
    console.log(
      "================ END GET MESSAGES CONTROLLER ================",
    );

    const messages = await messageService.getConversationMessages({
      conversationId,
      limit: Number(limit),
      before,
    });

    return res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getConversationMessages,
};
