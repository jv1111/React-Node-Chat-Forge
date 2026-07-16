import * as authApi from "../api/auth.api";

const register = async (userData) => {
  return authApi.register(userData);
};

const login = async (credentials) => {
  return authApi.login(credentials);
};
const me = async () => {
  return authApi.me();
};

const logout = async () => {
  return authApi.logout();
};

export { register, login, me, logout };
