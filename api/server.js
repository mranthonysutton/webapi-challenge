const express = require("express");
const cors = require("cors");
const projectRouter = require("./projects-route");
const actionRouter = require("./actions-route");
const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "API is running ..." });
});

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

module.exports = server;
