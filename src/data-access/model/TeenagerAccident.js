const mongoose = require("mongoose");
const { teenagerAccidentSchema } = require("../schema");

const TeenagerAccidenet = mongoose.model(
  "TeenagerAccidenet",
  teenagerAccidentSchema
);

module.exports = TeenagerAccidenet;
