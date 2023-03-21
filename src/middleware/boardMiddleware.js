const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const checkCompleteBoardFrom = (from) => (req, res, next) => {
  const { title, content, author } = req[from];
  if (title === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title은 필수값입니다.`
      )
    );
  }
  if (content === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: content는 필수값입니다.`
      )
    );
  }
  next();
};

const checkBoardIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinBoardConditionFrom = (from) => (req, res, next) => {
  const { title, content, image } = req[from];
  if (title === undefined && content === undefined && image === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title, content, image 중 최소 하나는 필요합니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteBoardFrom,
  checkBoardIdFrom,
  checkMinBoardConditionFrom,
};
