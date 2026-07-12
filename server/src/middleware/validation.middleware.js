const {
  validateEmail,
  validateUsername,
  validatePassword,
} = require("../utils/validator");

const validateRegister = (req, res, next) => {
  let { username, email, password } = req.body;

  username = username?.trim().toLowerCase();
  email = email?.trim().toLowerCase();
  password = password?.trim();

  // Required fields
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
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

  // Email
  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
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
    email,
    password,
  };

  next();
};

const validateLogin = (req, res, next) => {
  let { email, password } = req.body;

  email = email?.trim().toLowerCase();
  password = password?.trim();

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  req.body = {
    email,
    password,
  };

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
