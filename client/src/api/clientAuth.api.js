import { api } from "./axios";

const login = async (credentials) => {
  const response = await api.post("/client-auth/login", credentials);

  return response.data;
};

export { login };
