const mongoose = require("mongoose");
const { seoulAccidentTypeSchema } = require("../schema");

const SeoulCarAndCarCases = mongoose.model(
  "SeoulCarAndCarCases",
  seoulAccidentTypeSchema
);

module.exports = SeoulCarAndCarCases;
