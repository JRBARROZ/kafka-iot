require("dotenv").config();
const port = process.env.PORT;

const express = require("express");
const app = express();
const path = require("node:path");

const { consume } = require("./consumer");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/"));
});

consume("energy_measure", (props) => {
  console.log(props.message.value.toString());
});

app.listen(port, () => {
  console.log(`🔥 🚀 Server is up on : ${port}`);
});
