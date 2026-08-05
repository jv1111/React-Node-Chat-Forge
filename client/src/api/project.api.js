import { api } from "./axios";

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

export { getProject, createProject };
