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

  
};

module.exports = userController;
