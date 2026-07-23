const { Server } = require("socket.io");

const registerSocketEvents = require("../sockets");
const socketAuth = require("../sockets/socket.auth");

function createSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.use(socketAuth);

  registerSocketEvents(io);

  return io;
}

module.exports = createSocket;
