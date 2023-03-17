const { seoulTeenagerAccidentDAO } = require("../data-access");

const seoulTeenagerAccidentService = {
  async getSeoulTeenagerAccident({
    borough,
    latitude,
    longitudem,
    casualties,
  }) {
    const seoulTeenagerAccident = await seoulTeenagerAccidentDAO.findAll({
      borough,
      latitude,
      longitudem,
      casualties,
    });
    return seoulTeenagerAccident;
  },
};

module.exports = seoulTeenagerAccidentService;
