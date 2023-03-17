const mongoose = require("mongoose");
const { recruitmentParticipaintSchema } = require("../schema");

const RecruitmentParticipaint = mongoose.model(
  "RecruitmentParticipaint",
  recruitmentParticipaintSchema
);

module.exports = RecruitmentParticipaint;
