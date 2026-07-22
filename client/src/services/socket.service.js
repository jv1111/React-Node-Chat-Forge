import socket from "./socket.client";

import { SOCKET_EVENTS } from "../constants/socket.events.js";

export const joinRoom = (room) => {
  socket.emit(SOCKET_EVENTS.JOIN_ROOM, room);
};

export const leaveRoom = (room) => {
  socket.emit(SOCKET_EVENTS.LEAVE_ROOM, room);
};

export const sendMessage = (room, message) => {
  socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
    room,
    message,
  });
};
