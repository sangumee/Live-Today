import express from "express";
import http from "http";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import db from './lib/db'

db();
dotenv.config();

const app = express();

const index = require('./routes/index')
const users = require("./routes/users");

app.use(express.static(__dirname + "/src"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use("/", index);
app.use("/", users);

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "src", "index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`Server is listening on port ${process.env.PORT}`)
);