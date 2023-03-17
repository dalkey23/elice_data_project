const mongoose = require("mongoose");
const { recruitmentParticipaintSchema } = require("../schema");

const RecruitmentParticipaint = mongoose.model(
  "RecruitmentParticipaintSchema",
  recruitmentParticipaintSchema
);

module.exports = RecruitmentParticipaint;
