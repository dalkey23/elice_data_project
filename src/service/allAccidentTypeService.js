const { allAccidentTypeDAO } = require("../data-access");

const allAccidentTypeService = {
  async getAllAccidentType({ accident_type, death_toll, number_of_injured }) {
    const allAccidentType = await allAccidentTypeDAO.findAll({
      accident_type,
      death_toll,
      number_of_injured,
    });
    return allAccidentType;
  },
};

module.exports = allAccidentTypeService;
