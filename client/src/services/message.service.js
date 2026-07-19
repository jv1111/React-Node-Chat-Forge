import * as messageApi from "../api/message.api";

const sendMessage = async (messageData) => {
  return messageApi.sendMessage(messageData);
};

const getConversationMessages = async (conversationId) => {
  return messageApi.getConversationMessages(conversationId);
};

export { sendMessage, getConversationMessages };
