const { TeenagerAccidenet } = require("./model");

const teenagerAccidenetDAO = {
  async findAll() {
    const plainTeenagerAccidenet = await TeenagerAccidenet.find().lean();
    return plainTeenagerAccidenet;
  },
};

module.exports = teenagerAccidenetDAO;
