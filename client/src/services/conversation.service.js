import * as conversationApi from "../api/conversation.api";

const getClientConversations = async (projectCode, accessToken) => {
  return conversationApi.getClientConversations(projectCode, accessToken);
};

const getConversation = async (participants, accessToken) => {
  return conversationApi.getConversation(participants, accessToken);
};

const getConversationMessages = async (conversationId, accessToken) => {
  return conversationApi.getConversationMessages(conversationId, accessToken);
};

export { getClientConversations, getConversation, getConversationMessages };
