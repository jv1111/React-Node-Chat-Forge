const { hashPassword } = require("../utils/hash");

const projectService = require("./project.service");
const Client = require("../models/client.model");
const { capitalize } = require("../utils/format");

const DEFAULT_CLIENTS = [
  {
    username: "client1",
    password: "playground",
    firstName: "Client",
    lastName: "1",
  },
  {
    username: "client2",
    password: "playground",
    firstName: "Client",
    lastName: "2",
  },
  {
    username: "client3",
    password: "playground",
    firstName: "Client",
    lastName: "3",
  },
];

const createClient = async ({
  projectCode,
  username,
  password,
  firstName,
  middleName = "",
  lastName,
}) => {
  // Normalize client names for consistent storage and duplicate checks.
  // Example:
  //   "jOHn"        -> "John"
  const normalizedClient = {
    username: username.trim().toLowerCase(),
    firstName: capitalize(firstName),
    middleName: capitalize(middleName),
    lastName: capitalize(lastName),
  };

  const project = await projectService.findByProjectCode(projectCode);

  const existingUsername = await Client.findOne({
    project: project._id,
    username: normalizedClient.username,
  });

  if (existingUsername) {
    throw new Error("Username is already taken.");
  }

  const hashedPassword = await hashPassword(password);

  return Client.create({
    project: project._id,
    username: normalizedClient.username,
    password: hashedPassword,
    firstName: normalizedClient.firstName,
    middleName: normalizedClient.middleName,
    lastName: normalizedClient.lastName,
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
  const clients = await Promise.all(
    DEFAULT_CLIENTS.map(async (client) => ({
      project: projectId,
      username: client.username,
      password: await hashPassword(client.password),
      firstName: client.firstName,
      middleName: "",
      lastName: client.lastName,
    })),
  );

  return Client.insertMany(clients);
};

const getClients = async ({ projectCode, page = 1, limit = 20 }) => {
  const project = await projectService.findByProjectCode(projectCode);

  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const skip = (page - 1) * safeLimit;

  const [clients, total] = await Promise.all([
    Client.find({ project: project._id })
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    Client.countDocuments({
      project: project._id,
    }),
  ]);

  return {
    clients,
    pagination: {
      page,
      limit: safeLimit,
      total,
      totalPages: Math.ceil(total / safeLimit),
      hasNextPage: page * safeLimit < total,
      hasPreviousPage: page > 1,
    },
  };
};

module.exports = {
  createClient,
  createDefaultClients,
  findById,
  getClients,
};
