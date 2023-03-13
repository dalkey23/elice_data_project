const mongoose = require("mongoose");
const { meetingSchema } = require("../schema");

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
