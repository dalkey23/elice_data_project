const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const userService = require("../service");

// 이메일
const emailPattern =
  "^[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_]?[0-9a-zA-Z])*[.][a-z]{2,3}$";
// 비밀번호는 최소 8자, 최소 하나의 문자, 하나의 숫자, 하나의 특수문자로 구성
const passwordPattern =
  "^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])(?=.*?[A-Za-z]).{8,}$";

// 로그인 스키마
const loginSchema = Joi.object().keys({
  email: Joi.string().pattern(new RegExp(emailPattern)).required().messages({
    "string.base": "Email은 문자열이어야 합니다.",
    "any.required": "Email을 입력해주세요.",
    "string.pattern.base": "Email이 형식에 맞지 않습니다.",
  }),
  password: Joi.string()
    .pattern(new RegExp(passwordPattern))
    .required()
    .messages({
      "string.base": "비밀번호는 문자열이어야 합니다.",
      "any.required": "비밀번호를 입력해주세요.",
      "string.pattern.base": "비밀번호가 형식에 맞지 않습니다.",
    }),
});

// 로그인 유효성 검사
const checkLoginFrom = (from) => async (req, res, next) => {
  const { email, password } = req[from];

  try {
    await loginSchema.validateAsync({
      email,
      password,
    });
  } catch (error) {
    next(
      new AppError(
        commonErrors.inputError, 
        400, 
        `${error}`
      )
    );
  }
  next();
};

// 이미 로그인된 사용자인지 확인(토큰 유무 검증)
const existsToken = (req, res, next) => {
  if (req.cookies.accessToken) {
    next(
      new AppError(
        commonErrors.inputError, 
        400, 
        "이미 로그인되어 있습니다."
      )
    );
  }
  next();
};

// 토큰 유효 검증, 로그인된 사용자와 기능 접근 권한을 가진 사용자가 일치하는지 검사
const verifyAuthorizedUser = (from) => (req, res, next) => {
  try{
    // 접근하려는 기능의 권한을 가진 사용자 id
    const { id } = req[from];
    // 로그인한 사용자의 id
    const loginedUser = jwt.verify(req.cookies.accessToken, process.env.SECRET).id;
    
    // 각 사용자의 id 비교
    if(id !== loginedUser) {
      next(
          new AppError(
            commonErrors.authorizationError,
            403,
            "권한이 없는 사용자입니다."
        )
      );
    }
  } catch(error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    )
  }
  next();
};

// 토큰 유효 검증, 관리자 계정인지 검사
const verifyAdmin = (req, res, next) => {
  try{
    jwt.verify(req.cookies.accessToken, process.env.SECRET).id;
    const { userType } = req.cookies.accessToken;
    if(userType !== "admin") {
      next(
        new AppError(
          commonErrors.authorizationError,
          403,
          "관리자만 사용 가능합니다."
        )
      );
    }
  } catch(error) {
    next(
      new AppError(
        commonErrors.authorizationError,
        401,
        "토큰이 유효하지 않습니다."
      )
    );
  }
  next();
};

module.exports = {
  checkLoginFrom,
  existsToken,
  verifyAdmin,
  verifyAuthorizedUser,
};
