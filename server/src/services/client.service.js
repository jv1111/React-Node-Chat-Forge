const Project = require("../models/project.model");
const Client = require("../models/client.model");
const { capitalize } = require("../utils/format");

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

  const project = await Project.findOne({ projectCode });

  if (!project) {
    throw new Error("Project not found.");
  }

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

module.exports = {
  createClient,
};
