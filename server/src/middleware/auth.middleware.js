const { verifyAccessToken } = require("../utils/jwt");

const authenticate = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

  console.log("Cookies:", req.cookies);
  console.log("Authorization:", req.headers.authorization);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    const { id } = verifyAccessToken(token);

    req.user = { id };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = {
  authenticate,
};
