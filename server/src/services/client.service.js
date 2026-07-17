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
