const express = require("express");

const router = express.Router();

const {
  getTests,
  createTest,
  updateTest,
  deleteTest,
} = require("../controllers/test.controller");

router.route("/").get(getTests).post(createTest);

router.route("/:id").put(updateTest).delete(deleteTest);

module.exports = router;
