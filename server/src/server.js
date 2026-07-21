const http = require("http");
require("dotenv").config();

const app = require("./app");
const server = http.createServer(app);
const connectDB = require("./config/db");
const createSocket = require("./config/socket.config");

createSocket(server);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
