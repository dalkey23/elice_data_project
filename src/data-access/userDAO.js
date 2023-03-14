const { User } = require("./model");
const util = require("../misc/util");

const userDAO = {
  // 회원가입
  async create({ name, email, password, address, phoneNumber, nickname }) {
    const user = await User.create({
      name,
      email,
      password,
      address,
      phoneNumber,
      nickname,
    });
    return user;
  },

  // 단일 사용자 조회
  async findOne(filter) {
    const sanitizedFilter = util.sanitizeObject({
      id: filter.id,
      email: filter.email,
      nickname: filter.nickname,
    });
    const plainUser = await User.findOne(sanitizedFilter).lean();
    return plainUser;
  },

  // 모든 사용자 조회
  async findAll() {
    const users = await User.find().lean();
    return users;
  },

  // 사용자 정보 수정
  async updateOne(id, toUpdate) {
    // 의도치 않은 값이 저장되지 않도록 소독 
    const sanitizedToUpdate = util.sanitizeObject({
      name: toUpdate.name, 
      address: toUpdate.address, 
      phoneNumber: toUpdate.phoneNumber, 
      nickName: toUpdate.nickName, 
      profileImage: toUpdate.profileImage, 
    });
    const user = await User.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        new: true
      }
    ).lean();
    return user;
  },

  // 사용자 정보 삭제
  async deleteOne(id) {
    await User.deleteOne(id);
  },
};

module.exports = userDAO;
