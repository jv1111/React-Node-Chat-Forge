const bcrypt = require("bcrypt");

const userService = require("./user.service");

const register = async ({ username, email, password }) => {
  const emailExists = await userService.findByEmail(email);

  if (emailExists) {
    throw new Error("Email is already registered.");
  }

  const usernameExists = await userService.findByUsername(username);

  if (usernameExists) {
    throw new Error("Username is already taken.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await userService.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const login = async ({ email, password }) => {
  const INVALID_CREDENTIALS = "Invalid email or password.";

  const user = await userService.findByEmail(email, "+password");

  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error(INVALID_CREDENTIALS);
  }

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

module.exports = {
  register,
  login,
};
