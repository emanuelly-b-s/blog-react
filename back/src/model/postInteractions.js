const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  type: {
    type: String,
    enum: ["like", "comment", "other"],
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Interaction = mongoose.model("Interaction", interactionSchema);

module.exports = Interaction;
