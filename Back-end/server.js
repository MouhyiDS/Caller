const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');

require('dotenv').config();

connectDB();
const server = http.createServer(app);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));


// in case the route is not found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});