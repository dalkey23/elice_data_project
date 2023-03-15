const { userService } = require("../service");
const util = require("../misc/util");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { name, email, password, address, phoneNumber, nickname } = req.body;

      const user = await userService.createUser({
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
      });
      res.status(201).json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },

  //회원정보 수정
  async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
        profileImage,
      } = req.body;

      const user = await userService.updateUser(id, {
        name,
        email,
        password,
        address,
        phoneNumber,
        nickname,
        profileImage,
      });
      res.json(util.buildResponse(user));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = userController;
