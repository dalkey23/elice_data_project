const { seoulAccidentCasesDAO } = require("../data-access");

const seoulAccidentCasesService = {
  async getSeoulAccidentCases({
    borough,
    latitude,
    longitudem,
    number_of_cases,
  }) {
    const seoulAccidentCases = await seoulAccidentCasesDAO.findAll({
      borough,
      latitude,
      longitudem,
      number_of_cases,
    });
    return seoulAccidentCases;
  },
};

module.exports = seoulAccidentCasesService;
