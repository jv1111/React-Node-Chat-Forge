const projectService = require("./project.service");
const Client = require("../models/client.model");
const { capitalize } = require("../utils/format");

const DEFAULT_CLIENTS = ["Client 1", "Client 2", "Client 3"];

const createClient = async ({
  projectCode,
  firstName,
  middleName = "",
  lastName,
}) => {
  // Normalize client names for consistent storage and duplicate checks.
  // Example:
  //   "jOHn"        -> "John"
  const normalizedClient = {
    firstName: capitalize(firstName),
    middleName: capitalize(middleName),
    lastName: capitalize(lastName),
  };

  const project = await projectService.findByProjectCode(projectCode);

  const existingClient = await Client.findOne({
    project: project._id,
    ...normalizedClient,
  });

  if (existingClient) {
    throw new Error("Client already exists.");
  }

  return await Client.create({
    project: project._id,
    ...normalizedClient,
  });
};

const findById = async (projectId, clientId) => {
  const client = await Client.findOne({
    _id: clientId,
    project: projectId,
  });

  if (!client) {
    throw new Error("Client not found.");
  }

  return client;
};

const createDefaultClients = async (projectId) => {
  const clients = DEFAULT_CLIENTS.map((name) => {
    const [firstName, lastName] = name.split(" ");

    return {
      project: projectId,
      firstName,
      middleName: "",
      lastName,
    };
  });

  return Client.insertMany(clients);
};

module.exports = {
  createClient,
  createDefaultClients,
  findById,
};
