const messageService = require("../services/messageService");

module.exports = (io, socket) => {

  socket.on("send_group_message", async (data) => {

    const savedMessage = await messageService.sendMessage(data);

    io.to(data.group).emit("receive_message", savedMessage);

  });

};