const User = require("../models/user.model");

const findById = async (id) => {
  return await User.findById(id);
};

const findByEmail = (email, select = "") => {
  return User.findOne({ email }).select(select);
};

const findByUsername = async (username) => {
  return await User.findOne({ username });
};

const createUser = async (userData) => {
  return await User.create(userData);
};

const updateUser = async (id, updates) => {
  return await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
};

const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

const getAllUsers = async () => {
  return await User.find();
};

module.exports = {
  findById,
  findByEmail,
  findByUsername,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
