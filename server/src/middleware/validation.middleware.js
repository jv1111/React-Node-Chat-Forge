const { validateUsername, validatePassword } = require("../utils/validator");

const validateRegister = (req, res, next) => {
  let { username, password } = req.body;

  username = username?.trim().toLowerCase();
  password = password?.trim();

  // Required Fields
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  // Username
  if (!validateUsername(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Username must be 3-30 characters and contain only letters, numbers, and underscores.",
    });
  }

  // Password
  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and symbol.",
    });
  }

  req.body = {
    username,
    password,
  };

  next();
};

const validateLogin = (req, res, next) => {
  let { username, password } = req.body;

  username = username?.trim().toLowerCase();
  password = password?.trim();

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Username and password are required.",
    });
  }

  req.body = {
    username,
    password,
  };

  next();
};

const validateCreateClient = (req, res, next) => {
  let {
    projectCode,
    externalUserId,
    username,
    password,
    firstName,
    middleName = "",
    lastName,
  } = req.body;

  projectCode = projectCode?.trim();
  externalUserId = externalUserId?.trim();
  username = username?.trim().toLowerCase();
  password = password?.trim();
  firstName = firstName?.trim();
  middleName = middleName?.trim();
  lastName = lastName?.trim();

  if (
    !projectCode ||
    !externalUserId ||
    !username ||
    !password ||
    !firstName ||
    !lastName
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Project code, external user ID, username, password, first name, and last name are required.",
    });
  }

  if (!validateUsername(username)) {
    return res.status(400).json({
      success: false,
      message:
        "Username must be 3-30 characters and contain only letters, numbers, and underscores.",
    });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({
      success: false,
      message:
        "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number, and symbol.",
    });
  }

  req.body = {
    projectCode,
    externalUserId,
    username,
    password,
    firstName,
    middleName,
    lastName,
  };

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateCreateClient,
};
