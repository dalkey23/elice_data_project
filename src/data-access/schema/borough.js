const mongoose = require("mongoose");

const boroughSchema = new mongoose.Schema({
  borough: {
    type: String,
    required: true,
  },
});

module.exports = boroughSchema;
