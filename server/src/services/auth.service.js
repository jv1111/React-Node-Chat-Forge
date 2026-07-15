const bcrypt = require("bcrypt");

const userService = require("./user.service");
const { generateAccessToken } = require("../utils/jwt");

const register = async ({ username, password }) => {
  const usernameExists = await userService.findByUsername(username);

  if (usernameExists) {
    throw new Error("Username is already taken.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userService.createUser({
    username,
    password: hashedPassword,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const login = async ({ username, password }) => {
  const INVALID_CREDENTIALS = "Invalid username or password.";

  const user = await userService.findByUsername(username, "+password");

  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const accessToken = generateAccessToken(user);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    accessToken,
  };
};

module.exports = {
  register,
  login,
};
