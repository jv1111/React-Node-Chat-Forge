import * as clientAuthApi from "../api/clientAuth.api";

const login = async (credentials) => {
  return clientAuthApi.login(credentials);
};

export { login };
