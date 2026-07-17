const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");

const {
  createProject,
  getProjectByName,
} = require("../controllers/project.controller");

router.post("/", authenticate, createProject);

router.get("/:name", authenticate, getProjectByName);

module.exports = router;
