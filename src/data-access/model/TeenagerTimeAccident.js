const mongoose = require("mongoose");
const { ageTimeAccidentSchema } = require("../schema");

const TeenagerTimeAccident = mongoose.model(
  "TeenagerTimeAccident",
  ageTimeAccidentSchema
);

module.exports = TeenagerTimeAccident;
