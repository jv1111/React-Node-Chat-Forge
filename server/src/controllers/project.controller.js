const projectService = require("../services/project.service");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await projectService.createProject(req.user.id, name);

    return res.status(201).json({
      success: true,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getProjectByName = async (req, res) => {
  try {
    const { name } = req.params;

    const project = await projectService.findByDeveloperAndName(
      req.user.id,
      name,
    );

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjectByName,
};
