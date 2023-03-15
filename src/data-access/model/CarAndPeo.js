const mongoose = require("mongoose");
const { carAndPeoSchema } = require("../schema");

const CarAndPeo = mongoose.model("CarAndPeor", carAndPeoSchema);

module.exports = CarAndPeo;
