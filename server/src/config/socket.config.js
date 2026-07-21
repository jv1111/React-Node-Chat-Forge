const { Server } = require("socket.io");

const registerSocketEvents = require("../sockets");

function createSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  registerSocketEvents(io);

  return io;
}

module.exports = createSocket;
