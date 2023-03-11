const mongoose = require("mongoose");
const { carAndCarSchema } = require("../schema");

const CarAndCar = mongoose.model("CarAndCar", carAndCarSchema);

module.exports = CarAndCar;
