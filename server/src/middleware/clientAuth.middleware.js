const { validateUsername } = require("../utils/validator");
const { verifyAccessToken } = require("../utils/jwt");

const validateClientLogin = (req, res, next) => {
  let { projectCode, username, password } = req.body;

  projectCode = projectCode?.trim();
  username = username?.trim().toLowerCase();
  password = password?.trim();

  if (!projectCode || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Project code, username, and password are required.",
    });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Username must be 3-30 characters and contain only letters, numbers, and underscores.",
    });
  }

  req.body = {
    projectCode,
    username,
    password,
  };

  next();
};

const authenticateClient = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authentication required.",
    });
  }

  try {
    const { _id, projectId, type } = verifyAccessToken(token);

    if (type !== "client") {
      throw new Error();
    }

    req.client = {
      _id,
      projectId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = {
  validateClientLogin,
  authenticateClient,
};
