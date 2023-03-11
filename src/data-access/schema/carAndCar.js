const mongoose = require("mongoose");

const carAndCarSchema = new mongoose.Schema({
  accident_type2: {
    type: String,
    required: true,
  },
  number_of_accidents: {
    type: Number,
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

module.exports = carAndCarSchema;
