const express = require("express");
const postRouter = require("./postRouter");
const recruitmentRouter = require("./recruitmentRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/recruitment", recruitmentRouter);

module.exports = {
  v1: v1Router,
};
