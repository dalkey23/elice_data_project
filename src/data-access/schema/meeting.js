const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
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
    recruitment: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
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

module.exports = meetingSchema;
