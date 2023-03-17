const { teenagerAccidentDAO } = require("../data-access");

const teenagerAccidentService = {
  async getTeenagerAccident({ death_toll, accident_death }) {
    const teenagerAccident = await teenagerAccidentDAO.findAll({
      death_toll,
      accident_death,
    });
    return teenagerAccident;
  },
};

module.exports = teenagerAccidentService;
