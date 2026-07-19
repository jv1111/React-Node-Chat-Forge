import * as messageApi from "../api/message.api";

const sendMessage = async (messageData, accessToken) => {
  return messageApi.sendMessage(messageData, accessToken);
};

const getConversationMessages = async (conversationId) => {
  return messageApi.getConversationMessages(conversationId);
};

export { sendMessage, getConversationMessages };
