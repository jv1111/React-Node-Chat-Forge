const { SOCKET_EVENTS } = require("./socket.constants");

module.exports = (io, socket) => {
  // TODO add authentication in a clean way with jwt

  socket.on(SOCKET_EVENTS.JOIN_ROOM, (room) => {
    console.log(`[Socket] ${socket.id} joined room: ${room}`);

    socket.join(room);
  });

  socket.on(SOCKET_EVENTS.LEAVE_ROOM, (room) => {
    console.log(`[Socket] ${socket.id} left room: ${room}`);

    socket.leave(room);
  });

  socket.on(SOCKET_EVENTS.SEND_MESSAGE, ({ room, message }) => {
    console.log(`[Socket] ${socket.id} sent message to room ${room}:`, message);

    io.to(room).emit(SOCKET_EVENTS.MESSAGE, message);
  });
};
