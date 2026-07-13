const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const message = await messageService.sendMessage(req.body);

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

module.exports = {
  sendMessage,
};
