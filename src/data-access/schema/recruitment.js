const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    volunteerTime: {
      type: String,
      required: true,
    },
    recruitments: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    participation: {
      type: Number,
      default: 0,
      required: true,
    },
    meetingStatus: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Meeting",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = recruitmentSchema;
