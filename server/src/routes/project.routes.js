const express = require("express");

const router = express.Router();

const { authenticate } = require("../middleware/auth.middleware");

const { createProject } = require("../controllers/project.controller");

router.post("/", authenticate, createProject);

module.exports = router;
