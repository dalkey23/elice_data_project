const express = require("express");
const postRouter = require("./postRouter");
const boardRouter = require("./boardRouter")
const userRouter = require("./userRouter");
const authRouter = require("./authRouter");
const adminRouter = require("./adminRouter");

const v1Router = express.Router();

v1Router.use("/posts", postRouter);
v1Router.use("/board", boardRouter);
v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);
v1Router.use("/admin", adminRouter);

module.exports = {
  v1: v1Router,
};
