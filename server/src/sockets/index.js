const registerMessageEvents = require("./socket.events");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // Personal room
    const userRoom = socket.user._id.toString();
    socket.join(userRoom);

    registerMessageEvents(io, socket);

    socket.on("disconnect", () => {
      console.log("Disconnected:", socket.id);
    });
  });
};
