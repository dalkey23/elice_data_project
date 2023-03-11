const mongoose = require("mongoose");
const { seoulAccidentTypeSchema } = require("../schema");

const SeoulAccidentCases = mongoose.model(
  "SeoulAccidentCases",
  seoulAccidentTypeSchema
);

module.exports = SeoulAccidentCases;
