require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const app = express();
const cors = require('cors')
const path = require("node:path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { consume } = require("./consumer");

app.use(cors())
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/"));
});

io.on('connection', async (socket) => {
  socket.emit("room1", "Socket connected to room1")
  await consume("rooms", (props) => {
    const { message: { key, value} } = props
    socket.emit(key.toString(), `consuming ${key.toString()}`)
  
    socket.emit(key.toString(), JSON.parse(value.toString()))
  });
});

server.listen(port, () => {
  console.log(`🔥 🚀 Server is up on : ${port}`);
});
