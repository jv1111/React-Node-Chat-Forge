import { api } from "./axios";

const sendMessage = async (data) => {
  const response = await api.post("/messages", data);

  return response.data;
};

const getConversationMessages = async (conversationId) => {
  const response = await api.get(`/messages/conversations/${conversationId}`);

  return response.data;
};

export { sendMessage, getConversationMessages };
