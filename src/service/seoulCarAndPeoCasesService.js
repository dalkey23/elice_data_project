const { seoulCarAndPeoCasesDAO } = require("../data-access");

const seoulCarAndPeoCasesService = {
  async getSeoulCarAndPeoCases({
    borough,
    latitude,
    longitudem,
    number_of_cases,
  }) {
    const seoulCarAndPeoCases = await seoulCarAndPeoCasesDAO.findAll({
      borough,
      latitude,
      longitudem,
      number_of_cases,
    });
    return seoulCarAndPeoCases;
  },
};

module.exports = seoulCarAndPeoCasesService;
