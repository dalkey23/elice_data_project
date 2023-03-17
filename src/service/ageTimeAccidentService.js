const { ageTimeAccidentDAO } = require("../data-access");

const ageTimeAccidentService = {
  async getAgeTimeAccident({ by_time, death_toll, number_of_injured }) {
    const ageTimeAccident = await ageTimeAccidentDAO.findAll({
      by_time,
      death_toll,
      number_of_injured,
    });
    return ageTimeAccident;
  },
};

module.exports = ageTimeAccidentService;
