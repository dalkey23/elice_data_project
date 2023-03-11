const mongoose = require("mongoose");

const allAccidentTypeSchema = new mongoose.Schema({
  accident_type: {
    type: String,
    required: true,
  },
  death_toll: {
    type: Number,
    required: true,
  },
  number_of_injured: {
    type: Number,
    required: true,
  },
});

module.exports = allAccidentTypeSchema;
