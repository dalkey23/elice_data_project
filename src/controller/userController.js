const { userService } = require("../service");
const util = require("../misc/util");
const bycrypt = require("bcrypt");

const userController = {
  // 회원가입
  async createUser(req, res, next) {
    try {
      const { name, email, password, address, phoneNumber, nickname } = req.body;

      //password hashing
      const hashedPassword = await bycrypt.hash(password, 12);

      const user = await userService.createUser({
        name,
        email,
        password: hashedPassword,
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
