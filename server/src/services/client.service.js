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

const generateUniqueUsername = async (projectId, baseUsername) => {
  // Keep the requested username if it's still available.
  const usernameExists = await Client.exists({
    project: projectId,
    username: baseUsername,
  });

  if (!usernameExists) {
    return baseUsername;
  }

  // Username already exists. Generate username01, username02, ...
  let counter = 1;

  while (true) {
    const username = `${baseUsername}${String(counter).padStart(2, "0")}`;

    const exists = await Client.exists({
      project: projectId,
      username,
    });

    if (!exists) {
      return username;
    }

    counter++;
  }
};

const createClient = async ({
  projectCode,
  externalUserId,
  username,
  password,
  firstName,
  middleName = "",
  lastName,
}) => {
  const normalizedClient = {
    username: username.trim().toLowerCase(),
    firstName: capitalize(firstName),
    middleName: capitalize(middleName),
    lastName: capitalize(lastName),
  };

  const project = await projectService.findByProjectCode(projectCode);

  const existingClient = await Client.findOne({
    project: project._id,
    externalUserId,
  });

  if (existingClient) {
    throw new Error("This user is already registered in this project.");
  }

  const uniqueUsername = await generateUniqueUsername(
    project._id,
    normalizedClient.username,
  );

  const hashedPassword = await hashPassword(password);

  return Client.create({
    project: project._id,
    externalUserId,
    username: uniqueUsername,
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

const findClientByExternalUserId = async ({ projectCode, externalUserId }) => {
  const project = await projectService.findByProjectCode(projectCode);

  return Client.findOne({
    project: project._id,
    externalUserId,
  }).select("-password");
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

const getAvailableClients = async ({
  projectId,
  clientId,
  page = 1,
  limit = 20,
}) => {
  const safeLimit = Math.min(Math.max(limit, 1), 100);

  const skip = (page - 1) * safeLimit;

  const filter = {
    project: projectId,
    _id: { $ne: clientId },
  };

  const [clients, total] = await Promise.all([
    Client.find(filter)
      .select("-password")
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    Client.countDocuments(filter),
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
  findClientByExternalUserId,
  getClients,
  getAvailableClients,
};
