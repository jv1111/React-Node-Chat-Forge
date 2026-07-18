import * as clientApi from "../api/client.api";

const createClient = async (clientData) => {
  return clientApi.createClient(clientData);
};

const getClients = async (projectCode) => {
  return clientApi.getClients(projectCode);
};

const getAvailableClients = async (accessToken) => {
  return clientApi.getAvailableClients(accessToken);
};

export { createClient, getClients, getAvailableClients };
