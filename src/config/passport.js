const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const userDAO = require("../data-access/userDAO");
const bcrypt = require("bcrypt");

require("dotenv").config();

module.exports = () => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userDAO.findOne({ email });
          if (!user) {
            throw new Error("회원을 찾을 수 없습니다.");
          }

          if (!bcrypt.compare(password, user.password)) {
            throw new Error("비밀번호가 일치하지 않습니다.");
          }

          done(null, {
            id: user._id,
            nickname: user.nickname,
            email: user.email,
            userType: user.userType,
          });
        } catch (error) {
          done(error, null);
        }
      }
    )
  );

  // JWT Strategy
  const cookieExtractor = (req) => {
    const { token } = req.cookies;
    return token;
  };

  const opts = {
    secretOrKey: process.env.SECRET,
    jwtFromRequest: cookieExtractor,
  };

  passport.use(
    new JWTStrategy(opts, (user, done) => {
      done(null, user);
    })
  );
};
