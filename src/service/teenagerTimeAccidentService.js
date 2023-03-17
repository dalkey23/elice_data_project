const { teenagerTimeAccidentDAO } = require("../data-access");

const teenagerTimeAccidentService = {
  async getTeenagerTimeAccident({ by_time, death_toll, number_of_injured }) {
    const teenagerTimeAccident = await teenagerTimeAccidentDAO.findAll({
      by_time,
      death_toll,
      number_of_injured,
    });
    return teenagerTimeAccident;
  },
};

module.exports = teenagerTimeAccidentService;
