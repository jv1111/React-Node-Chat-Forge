import { api } from "./axios";

const getProjects = async (page = 1, limit = 5) => {
  const response = await api.get("/projects", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};

const getProject = async (name) => {
  const response = await api.get(`/projects/${name}`);

  return response.data;
};

const createProject = async (name) => {
  const response = await api.post("/projects", {
    name,
  });

  return response.data;
};

const regenerateProjectCode = async (projectId) => {
  const response = await api.patch(`/projects/${projectId}/project-code`);

  return response.data;
};

export { getProjects, getProject, createProject, regenerateProjectCode };
