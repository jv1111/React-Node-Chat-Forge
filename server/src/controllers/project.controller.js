const projectService = require("../services/project.service");

const createProject = async (req, res) => {
  try {
    const { name } = req.body;

    const project = await projectService.createProject(req.user._id, name);

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

const getProjects = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const result = await projectService.getProjects(req.user._id, page, limit);

    return res.status(200).json({
      success: true,
      data: result.projects,
      pagination: result.pagination,
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
      req.user._id,
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

const regenerateProjectCode = async (req, res) => {
  try {
    const project = await projectService.regenerateProjectCode(
      req.user._id,
      req.params.id,
    );

    return res.status(200).json({
      success: true,
      message: "Project code regenerated successfully.",
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
  getProjects,
  getProjectByName,
  regenerateProjectCode,
};
