const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true,
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

// A conversation must have exactly two participants.
conversationSchema.path("participants").validate(function (participants) {
  return participants.length === 2;
}, "A conversation must contain exactly two participants.");

module.exports = mongoose.model("Conversation", conversationSchema);
