const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
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

// Prevent duplicate client names within the same project
clientSchema.index(
  {
    project: 1,
    firstName: 1,
    middleName: 1,
    lastName: 1,
  },
  { unique: true },
);

module.exports = mongoose.model("Client", clientSchema);
