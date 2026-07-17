const { comparePassword } = require("../utils/hash");

const Client = require("../models/client.model");
const projectService = require("./project.service");

const { generateAccessToken } = require("../utils/jwt");

const login = async ({ projectCode, username, password }) => {
  const INVALID_CREDENTIALS = "Invalid username or password.";

  const project = await projectService.findByProjectCode(projectCode);

  const client = await Client.findOne({
    project: project._id,
    username,
  }).select("+password");

  if (!client) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const validPassword = await comparePassword(password, client.password);

  if (!validPassword) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const accessToken = generateAccessToken({
    type: "client",
    id: client.id,
    projectId: project.id,
  });

  return {
    client: {
      id: client.id,
      username: client.username,
      firstName: client.firstName,
      middleName: client.middleName,
      lastName: client.lastName,
    },
    accessToken,
  };
};

module.exports = {
  login,
};
