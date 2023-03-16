const { userDAO } = require("../data-access");
const util = require("../misc/util");
const bcrypt = require("bcrypt");

const userService = {
  async createUser({ name, email, password, address, phoneNumber, nickname }) {
    const existedEmail = await userDAO.findOne({ email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    }

    const existedNickname = await userDAO.findOne({ nickname });
    if (existedNickname) {
      throw new Error("중복되는 닉네임입니다.");
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
    { name, email, password, address, phoneNumber, nickname, profileImage }
  ) {
    // email 수정하는 경우 이메일 중복 검사
    if (email !== undefined) {
      const existedEmail = await userDAO.findOne({ email });
      if (existedEmail) {
        throw new Error("이미 가입된 이메일입니다.");
      }
    }

    // email 수정하는 경우 닉네임 중복 검사
    if(nickname !== undefined) {
      const existedNickname = await userDAO.findOne({ nickname });
    if (existedNickname) {
      throw new Error("중복되는 닉네임입니다.");
    }
    }

    // password 수정하는 경우 해싱
    const hashedPassword = await password? bcrypt.hash(password, 10) : password;

    const updatedUser = await userDAO.updateOne(id, {
      name,
      email,
      password: hashedPassword,
      address,
      phoneNumber,
      nickname,
      profileImage,
    });
    return updatedUser;
  },

  async deleteUser(id) {
    const deletedUser = await userDAO.deleteOne(id);
    return deletedUser;
  },
};

module.exports = userService;
