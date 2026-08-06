const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    externalUserId: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    middleName: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "",
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate client username within the same project
clientSchema.index(
  {
    project: 1,
    username: 1,
  },
  { unique: true },
);

// Prevent the same external user from being linked
// more than once within the same project
clientSchema.index(
  {
    project: 1,
    externalUserId: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      externalUserId: { $exists: true, $type: "string" },
    },
  },
);

module.exports = mongoose.model("Client", clientSchema);
