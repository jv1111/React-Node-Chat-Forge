const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const testRoutes = require("./routes/test.routes");
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const clientRoutes = require("./routes/client.routes");
const clientAuthRoutes = require("./routes/clientAuth.routes"); //TODO clean this up the creation is in the client put it here
const messageRoutes = require("./routes/message.routes");
const conversationRoutes = require("./routes/conversation.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/test", testRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/client-auth", clientAuthRoutes);

module.exports = app;
