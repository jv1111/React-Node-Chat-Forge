import { getSocket } from "./socket.client";

import { SOCKET_EVENTS } from "../constants/socket.events.js";

export const joinRoom = (conversationId) => {
  getSocket().emit(SOCKET_EVENTS.JOIN_ROOM, conversationId);
};

export const leaveRoom = (conversationId) => {
  getSocket().emit(SOCKET_EVENTS.LEAVE_ROOM, conversationId);
};

export const sendMessage = (toClientId, content) => {
  getSocket().emit(SOCKET_EVENTS.SEND_MESSAGE, {
    toClientId,
    content,
  });
};

// Listeners
export const onMessage = (callback) => {
  getSocket().on(SOCKET_EVENTS.MESSAGE, callback);
};

export const offMessage = (callback) => {
  getSocket().off(SOCKET_EVENTS.MESSAGE, callback);
};

export const onError = (callback) => {
  getSocket().on(SOCKET_EVENTS.ERROR, callback);
};

export const offError = (callback) => {
  getSocket().off(SOCKET_EVENTS.ERROR, callback);
};
