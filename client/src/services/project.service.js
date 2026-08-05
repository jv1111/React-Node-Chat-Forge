import * as projectApi from "../api/project.api";

const getProject = async (name) => {
  return projectApi.getProject(name);
};

const createProject = async (name) => {
  return projectApi.createProject(name);
};

export { getProject, createProject };
