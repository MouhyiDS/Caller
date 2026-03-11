const messageSocket = require("./messageSocket");
const roomSocket = require("./roomSocket");

module.exports = (io) => {

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    roomSocket(io, socket);
    messageSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });

  });

};