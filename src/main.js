require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const app = express();
const path = require("node:path");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const { consume } = require("./consumer");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/"));
});


io.on('connection', (socket) => {
  console.log('a user connected');
  consume("rooms", (props) => {
    const { message: { key, value} } = props
  
    socket.emit(key.toString(), JSON.parse(value.toString()))
  });
});

server.listen(port, () => {
  console.log(`🔥 🚀 Server is up on : ${port}`);
});
