import { useEffect, useState } from "react";

import * as projectService from "../services/project.service";

const PROJECT_NAME = "Playground";

const usePlaygroundProject = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        const response = await projectService.getProject(PROJECT_NAME);

        console.log("Project response:", response);

        setProject(response.data);
      } catch (err) {
        console.error("Failed to load Playground project:", err);
        console.error("Response:", err.response);

        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, []);

  return {
    project,
    loading,
    error,
  };
};

export default usePlaygroundProject;
