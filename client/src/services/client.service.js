import * as clientApi from "../api/client.api";

const createClient = async (clientData) => {
  return clientApi.createClient(clientData);
};

const getClients = async (projectCode) => {
  return clientApi.getClients(projectCode);
};

export { createClient, getClients };
