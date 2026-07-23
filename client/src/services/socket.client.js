import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (accessToken) => {
  if (socket) {
    socket.disconnect();
  }

  socket = io("http://localhost:5000", {
    auth: {
      token: accessToken,
    },
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
