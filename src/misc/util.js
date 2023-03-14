const jwt = require("jsonwebtoken");

function sanitizeObject(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if (value !== undefined) {
      map[key] = value;
    }
    return map;
  }, {});
  return result;
}

function buildResponse(data, errorMessage) {
  return {
    error: errorMessage ?? null,
    data,
  };
}

// password 제거
function removePassword(obj) {
  const result = Object.entries(obj).reduce((map, [key, value]) => {
    if(key !== "password") {
      map[key] = value;
    }
    return map;
  }, {})
  return result;
}

// 쿠키에 jwt 발급
const setUserToken = (res, user) => {
  //jwt 생성(유효 시간 1시간으로 설정)
  const accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
  res.cookie('accessToken', accessToken, { httpOnly: true }).json(user);
}

module.exports = {
  sanitizeObject,
  buildResponse,
  removePassword,
  setUserToken,
};
