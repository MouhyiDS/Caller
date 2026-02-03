const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // for private chats
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // for group chats
    },
    content: {
      type: String, // text OR file/image URL
    },
    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
