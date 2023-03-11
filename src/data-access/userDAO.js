const { User } = require("./model");

const userDAO = {
  // 회원가입
  async create({ name, email, password, address, phoneNumber, nickname }) {
    const existedEmail = await User.findOne({ email: email });
    if (existedEmail) {
      throw new Error("이미 가입된 이메일입니다.");
    } else {
      const user = await User.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
      });
      return user;
    }
  },

  // 단일 사용자 조회
  async findOne(_id) {
    const user = await User.findById(_id);
    return user;
  },

  // 모든 사용자 조회
  async findAll() {
    const users = await User.find();
    return users;
  },

  // 사용자 정보 수정
  async updateOne(_id, toUpdate) {
    const user = await User.findByIdAndUpdate(
      _id,
      {
        name: toUpdate.name, 
        password: toUpdate.password, 
        address: toUpdate.address, 
        phoneNumber: toUpdate.phoneNumber, 
        nickName: toUpdate.nickName, 
        profileImage: toUpdate.profileImage, 
      },
      {
        new: true
      }
    );
    return user;
  },

  // 사용자 정보 삭제
  async deleteOne(_id) {
    await User.deleteOne(_id);
  },
};

module.exports = userDAO;
