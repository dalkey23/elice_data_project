const mongoose = require("mongoose");
const { seoulAccidentTypeSchema } = require("../schema");

const SeoulCarAndPeoCases = mongoose.model(
  "SeoulCarAndPeoCases",
  seoulAccidentTypeSchema
);

module.exports = SeoulCarAndPeoCases;
