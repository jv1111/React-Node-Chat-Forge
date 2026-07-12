const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    projectCode: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

// A developer cannot have two projects with the same name
projectSchema.index({ developer: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Project", projectSchema);
