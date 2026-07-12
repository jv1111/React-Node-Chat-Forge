const validator = require("validator");

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validateUsername = (username) => {
  return (
    validator.isLength(username, { min: 3, max: 30 }) &&
    validator.matches(username, /^[a-zA-Z0-9_]+$/)
  );
};

const validatePassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  });
};

module.exports = {
  validateEmail,
  validateUsername,
  validatePassword,
};
