const { verifyAccessToken } = require("../utils/jwt");

const socketAuth = (socket, next) => {
  try {
    const token = socket.handshake.auth.token;

    if (!token) {
      return next(new Error("Authentication required."));
    }

    const decoded = verifyAccessToken(token);

    if (decoded.type !== "client") {
      return next(new Error("Unauthorized."));
    }

    socket.user = decoded;

    next();
  } catch (error) {
    next(new Error("Invalid or expired token."));
  }
};

module.exports = socketAuth;
