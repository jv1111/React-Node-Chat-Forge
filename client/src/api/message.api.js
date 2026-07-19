import { api } from "./axios";

const sendMessage = async (messageData, accessToken) => {
  const response = await api.post("/messages", messageData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const getConversationMessages = async (conversationId) => {
  const response = await api.get(`/messages/conversations/${conversationId}`);

  return response.data;
};

export { sendMessage, getConversationMessages };
