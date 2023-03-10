const express = require("express");
const postRouter = require("./postRouter");
const boardRouter = require("./boardRouter")

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/board", boardRouter);


module.exports = {
  v1: v1Router,
};
