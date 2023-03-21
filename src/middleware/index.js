const postMiddleware = require("./postMiddleware");
const userMiddleware = require("./userMiddleware");
const authMiddleware = require("./authMiddleware");
const recruitmentMiddleware = require("./recruitmentMiddleware");
const participantsMiddleware = require("./participantsMiddleware");

module.exports = {
  postMiddleware,
  userMiddleware,
  authMiddleware,
  recruitmentMiddleware,
  participantsMiddleware,
};
