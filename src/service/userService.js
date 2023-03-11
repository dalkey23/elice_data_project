const { userDAO } = require("../data-access");

const userService = {
  async createUser({
    name,
    email,
    password,
    address,
    phoneNumber,
    nickname,
  }) {
    const createdUser = await userDAO.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      nickname,
    });
    return createdUser;
  },

  async getUser(_id) {
    const user = await userDAO.findOne(_id);
    return user;
  },

  async getAllUsers() {
    const users = await userDAO.findAll();
    return users;
  },

  async updateUser(_id, { name, password, address, phoneNumber, nickname, profileImage }) {
    const updatedUser = await userDAO.updateOne({
      name,
      password,
      address,
      phoneNumber,
      nickname,
      profileImage,
    });
    return updatedUser;
  },

  async deleteUser(_id) {
    await userDAO.deleteOne(_id);
  },
};

module.exports = userService;
