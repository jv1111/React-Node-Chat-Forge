const { SOCKET_EVENTS } = require("./socket.constants");
const messageService = require("../services/message.service");

module.exports = (io, socket) => {
  socket.on(SOCKET_EVENTS.JOIN_ROOM, (room) => {
    socket.join(room);
  });

  socket.on(SOCKET_EVENTS.LEAVE_ROOM, (room) => {
    socket.leave(room);
  });

  socket.on(SOCKET_EVENTS.SEND_MESSAGE, async ({ toClientId, content }) => {
    try {
      const response = await messageService.sendMessage({
        projectId: socket.user.projectId,
        fromClientId: socket.user._id,
        toClientId,
        content,
      });

      if (!response.conversationCreated) {
        io.to(response.conversation._id.toString()).emit(
          SOCKET_EVENTS.MESSAGE,
          response.message,
        );
      }

      if (response.conversationCreated) {
        io.to(socket.user._id.toString()).emit(
          SOCKET_EVENTS.NEW_CONVERSATION,
          response.message,
        );

        io.to(toClientId.toString()).emit(
          SOCKET_EVENTS.NEW_CONVERSATION,
          response.message,
        );
      }
    } catch (error) {
      console.error(error);

      socket.emit(SOCKET_EVENTS.ERROR, {
        message: error.message,
      });
    }
  });
};
