const { validateUsername } = require("../utils/validator");

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

module.exports = {
  validateClientLogin,
};
