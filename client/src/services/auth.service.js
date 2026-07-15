import * as authApi from "../api/auth.api";

const register = async (userData) => {
  return authApi.register(userData);
};

const login = async (credentials) => {
  return authApi.login(credentials);
};

export { register, login };
