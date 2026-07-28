import { api } from "./axios";

const getClientConversations = async (projectCode, accessToken) => {
  const response = await api.get(`/conversations/${projectCode}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

const getConversation = async (participants, accessToken) => {
  const response = await api.post(
    "/conversations/find",
    {
      participants,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

const getConversationMessages = async (
  conversationId,
  accessToken,
  limit = 10,
  before = null,
) => {
  const params = new URLSearchParams();

  params.append("limit", limit);

  if (before) {
    params.append("before", before);
  }

  const response = await api.get(
    `/messages/conversations/${conversationId}?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export { getClientConversations, getConversation, getConversationMessages };
