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
      ref: "User",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
    content: {
      type: String, // text message (optional now)
    },
    mediaUrl: {
      type: String, // link to image/file
    },
    mediaType: {
      type: String, // "image", "video", "file"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
