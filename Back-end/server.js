const http = require('http');
const app = require('./app');
const {Server} = require('socket.io');
const connectDB = require('./config/db');

require('dotenv').config();

connectDB();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));



const server = http.createServer(app);

const io = new Server(server, {
  cors : {
    origin : "*",
  },
})

//socket
io.on("connection", (socket)=> {
  console.log("user connected : ", socket.id);

  socket.on("hello", (data) => {
    console.log("Received hello event with data: ", data);
    socket.emit("helloResponse", { message: "Hello from the server!" });
  })

  socket.on("disconnect", ()=> {
    console.log("user disconnected : ", socket.id);
  })
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});