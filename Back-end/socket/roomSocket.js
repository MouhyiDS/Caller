module.exports = (io, socket) => {

  socket.on("join_group", (groupId) => {

    socket.join(groupId);

    console.log(`Socket ${socket.id} joined group ${groupId}`);

  });

};