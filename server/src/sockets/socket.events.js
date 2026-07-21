module.exports = (io, socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  socket.on("send-message", ({ room, message }) => {
    io.to(room).emit("message", message);
  });
};
