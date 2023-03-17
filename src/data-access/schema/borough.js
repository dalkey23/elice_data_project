const mongoose = require("mongoose");

const boroughSchema = new mongoose.Schema(
  {
    borough: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Borough",
  }
);

module.exports = boroughSchema;
