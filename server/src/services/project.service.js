const crypto = require("crypto");

const Project = require("../models/project.model");

const generateProjectCode = () => {
  return `prj_${crypto.randomBytes(8).toString("hex")}`;
};

const createProject = async (developerId, name) => {
  const existingProject = await Project.findOne({
    developer: developerId,
    name,
  });

  if (existingProject) {
    throw new Error("A project with this name already exists.");
  }

  let projectCode;

  do {
    projectCode = generateProjectCode();
  } while (await Project.exists({ projectCode }));

  const project = await Project.create({
    developer: developerId,
    name,
    projectCode,
  });

  return project;
};

const findByProjectCode = async (projectCode) => {
  const project = await Project.findOne({ projectCode });

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
};

const findByDeveloperAndName = async (developerId, name) => {
  const project = await Project.findOne({
    developer: developerId,
    name,
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
};

module.exports = {
  generateProjectCode,
  createProject,
  findByProjectCode,
  findByDeveloperAndName,
};
