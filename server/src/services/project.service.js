const crypto = require("crypto");

const Project = require("../models/project.model");
const { getPagination, getPaginationMetadata } = require("../utils/pagination");

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

const getProjects = async (developerId, page = 1, limit = 5) => {
  const {
    page: currentPage,
    limit: safeLimit,
    skip,
  } = getPagination(page, limit);

  const [projects, total] = await Promise.all([
    Project.find({ developer: developerId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .lean(),

    Project.countDocuments({
      developer: developerId,
    }),
  ]);

  return {
    projects,
    pagination: getPaginationMetadata(currentPage, safeLimit, total),
  };
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

const regenerateProjectCode = async (developerId, projectId) => {
  const project = await Project.findOne({
    _id: projectId,
    developer: developerId,
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  let projectCode;

  do {
    projectCode = generateProjectCode();
  } while (await Project.exists({ projectCode }));

  project.projectCode = projectCode;
  await project.save();

  return project;
};

module.exports = {
  generateProjectCode,
  createProject,
  getProjects,
  findByProjectCode,
  findByDeveloperAndName,
  regenerateProjectCode,
};
