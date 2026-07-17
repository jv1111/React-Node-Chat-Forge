import * as clientApi from "../api/client.api";

const createClient = async (clientData) => {
  return clientApi.createClient(clientData);
};

export { createClient };
