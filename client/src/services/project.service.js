import * as projectApi from "../api/project.api";

const getProjects = async (page = 1, limit = 5) => {
  return projectApi.getProjects(page, limit);
};

const getProject = async (name) => {
  return projectApi.getProject(name);
};

const createProject = async (name) => {
  return projectApi.createProject(name);
};

const regenerateProjectCode = async (projectId) => {
  return projectApi.regenerateProjectCode(projectId);
};

export { getProjects, getProject, createProject, regenerateProjectCode };
