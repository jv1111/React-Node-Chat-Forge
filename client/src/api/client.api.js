import { api } from "./axios";

// todo put this in client auth
const createClient = async (data) => {
  const response = await api.post("/clients", data);

  return response.data;
};

const getClients = async (projectCode) => {
  const response = await api.get("/clients", {
    params: {
      projectCode,
    },
  });

  return response.data;
};

const getAvailableClients = async (accessToken) => {
  const response = await api.get("/clients/available", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
};

export { createClient, getClients, getAvailableClients };
