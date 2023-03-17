const mongoose = require("mongoose");

const recruitmentParticipaintSchema = new mongoose.Schema(
  {
    // recruitmentId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    // participaintId: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
  },
  {
    collection: "RecruitmentParticipaint",
  }
);

module.exports = recruitmentParticipaintSchema;
