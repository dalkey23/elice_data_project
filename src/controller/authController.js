const { userService } = require("../service");
const passport = require("passport");
const { setUserToken } = require("../misc/util");
const util = require("../misc/util");

const authController = {
  async login(req, res, next) {
    passport.authenticate("local", (err, user) => {
      if (err) return next(err);
      req.logIn(user, { session: false }, (err) => {
        if (err) return next(err);
        return setUserToken(res, user);
      });
    })(req, res, next);
  },

  async logout(req, res, next) {
    try {
      req.logout(() => {
        if (!req.cookies['accessToken']){
          throw new Error("로그인된 상태가 아닙니다.");
        }
        res.clearCookie('accessToken')
        .status(200)
        .json(util.buildResponse(`로그아웃되었습니다.`));
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
