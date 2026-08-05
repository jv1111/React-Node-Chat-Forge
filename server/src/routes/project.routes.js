const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");

const {
  createProject,
  getProjects,
  getProjectByName,
  regenerateProjectCode,
} = require("../controllers/project.controller");

router.post("/", authenticate, createProject);
router.get("/", authenticate, getProjects);
router.patch("/:id/project-code", authenticate, regenerateProjectCode);
router.get("/:name", authenticate, getProjectByName);

module.exports = router;
