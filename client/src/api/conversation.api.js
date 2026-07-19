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

export { getClientConversations, getConversation };
