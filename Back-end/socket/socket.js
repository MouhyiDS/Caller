const messageSocket = require("./messageSocket");
const roomSocket = require("./roomSocket");

const onlineUsers = new Map();
module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("register_user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    roomSocket(io, socket);
    messageSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      socket.on("register_user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
    });

  });

};