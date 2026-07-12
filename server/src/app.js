const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

module.exports = app;
