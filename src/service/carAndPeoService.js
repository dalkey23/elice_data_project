const { carAndPeoDAO } = require("../data-access");

const carAndPeoService = {
  async getCarAndPeo({
    accident_type2,
    number_of_accidents,
    death_toll,
    number_of_injured,
  }) {
    const carAndPeo = await carAndPeoDAO.findAll({
      accident_type2,
      number_of_accidents,
      death_toll,
      number_of_injured,
    });
    return carAndPeo;
  },
};

module.exports = carAndPeoService;
