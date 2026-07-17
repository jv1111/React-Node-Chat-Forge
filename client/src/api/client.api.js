import { api } from "./axios";

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

export { createClient, getClients };
