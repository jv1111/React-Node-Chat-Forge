const { hashPassword, comparePassword } = require("../utils/hash");
const projectService = require("./project.service");
const clientService = require("./client.service");

const userService = require("./user.service");
const { generateAccessToken } = require("../utils/jwt");

const register = async ({ username, password }) => {
  const usernameExists = await userService.findByUsername(username);

  if (usernameExists) {
    throw new Error("Username is already taken.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await userService.createUser({
    username,
    password: hashedPassword,
  });

  const project = await projectService.createProject(user.id, "Playground");

  await clientService.createDefaultClients(project._id);

  return {
    id: user.id,
    username: user.username,
    email: user.email,
  };
};

const login = async ({ username, password }) => {
  const INVALID_CREDENTIALS = "Invalid username or password.";

  console.log("Request:");
  console.log({
    username,
    password,
  });

  const user = await userService.findByUsername(username, "+password");
  console.log("\nUser from database:");
  console.log(user);

  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const validPassword = await comparePassword(password, user.password);

  if (!validPassword) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const accessToken = generateAccessToken({
    type: "developer",
    id: user.id,
  });

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
