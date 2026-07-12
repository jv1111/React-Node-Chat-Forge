const Project = require("../models/project.model");

const createProject = async (developerId, name) => {
  const existingProject = await Project.findOne({
    developer: developerId,
    name,
  });

  if (existingProject) {
    throw new Error("A project with this name already exists.");
  }

  const project = await Project.create({
    developer: developerId,
    name,
  });

  return project;
};

module.exports = {
  createProject,
};
