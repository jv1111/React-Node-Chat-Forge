import { useCallback, useEffect, useState } from "react";

import * as projectService from "../services/project.service";

const useProjects = (page = 1, limit = 5) => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [regeneratingProjectId, setRegeneratingProjectId] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);

      const response = await projectService.getProjects(page, limit);

      setProjects(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const regenerateProjectCode = useCallback(async (projectId) => {
    try {
      setRegeneratingProjectId(projectId);

      const response = await projectService.regenerateProjectCode(projectId);
      const updatedProject = response.data;

      setProjects((currentProjects) =>
        currentProjects.map((project) =>
          project._id === updatedProject._id ? updatedProject : project,
        ),
      );

      return updatedProject;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setRegeneratingProjectId(null);
    }
  }, []);

  return {
    projects,
    pagination,
    loading,
    regeneratingProjectId,
    regenerateProjectCode,
    refreshProjects: fetchProjects,
  };
};

export default useProjects;
