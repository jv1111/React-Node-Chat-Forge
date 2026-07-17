import { api } from "./axios";

const createClient = async (data) => {
  const response = await api.post("/clients", data);

  return response.data;
};

export { createClient };
