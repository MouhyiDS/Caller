const {io} = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
    console.log("user connceted with id: ", socket.id);

    socket.emit("hello", {message : "Hello from the client!"});

})