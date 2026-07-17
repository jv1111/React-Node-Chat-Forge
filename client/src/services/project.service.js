import * as projectApi from "../api/project.api";

const getProject = async (name) => {
  return projectApi.getProject(name);
};

export { getProject };
