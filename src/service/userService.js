const { userDAO } = require("../data-access");
const util = require("../misc/util");
const bcrypt = require("bcrypt");

const userService = {
  async createUser({ name, email, password, address, phoneNumber, nickname }) {
    const existedEmail = await userDAO.findOne({ email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    }
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await userDAO.create({
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      nickname,
    });
    return createdUser;
  },

  async getUser(id) {
    const user = await userDAO.findOne({ id });
    const servedUser = util.removePassword(user);
    return servedUser;
  },

  async getAllUsers() {
    const users = await userDAO.findAll();
    const sanitzedUsers = users["data"].reduce((map, object) => {
      map.push(removePassword(object));
      return map;
    }, []);
    const servedUsers = {
      data: sanitzedUsers,
    };
    return servedUsers;
  },

  async updateUser(
    id,
    { name, password, address, phoneNumber, nickname, profileImage }
  ) {
    const updatedUser = await userDAO.updateOne(id, {
      name,
      password,
      address,
      phoneNumber,
      nickname,
      profileImage,
    });
    return updatedUser;
  },

  async deleteUser(id) {
    await userDAO.deleteOne(id);
  },
};

module.exports = userService;
