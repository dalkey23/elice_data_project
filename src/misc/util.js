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
  //jwt 생성
  const token = jwt.sign(user, process.env.SECRET);
  res.cookie('token', token);
}

module.exports = {
  sanitizeObject,
  buildResponse,
  removePassword,
  setUserToken,
};
