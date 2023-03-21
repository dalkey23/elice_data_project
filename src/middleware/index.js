const postMiddleware = require("./postMiddleware");
const userMiddleware = require("./userMiddleware");
const authMiddleware = require("./authMiddleware");
const recruitmentMiddleware = require("./recruitmentMiddleware");
const boardMiddleware = require("./boardMiddleware");

module.exports = {
  postMiddleware,
  userMiddleware,
  authMiddleware,
  recruitmentMiddleware,
  boardMiddleware,
};
