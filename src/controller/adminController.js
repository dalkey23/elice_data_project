const { userService } = require("../service");
const util = require("../misc/util");

const adminController = {
  async getUserslist(req, res, next) {
    const users = await userService.getAllUsers();
    res.json(util.buildResponse(users));
  },

  async updateUser(req, res, next) {
    try{
      const { id } = req.params;
      const { userType } = req.body;
      const user = await userService.updateUser(id, { userType });
      res.json(util.buildResponse(user));
    } catch(error) {
      next(error);
    }
  },

  async deleteUser(req, res, next) {
    try{
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.json(`${user.nickname}님의 탈퇴가 완료되었습니다.`);
    } catch(error) {
      next(error);
    }
  },
};

module.exports = adminController;
