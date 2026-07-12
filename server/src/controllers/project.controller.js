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

module.exports = {
  createProject,
};
