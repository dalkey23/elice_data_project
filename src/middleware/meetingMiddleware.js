const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.number().required(),
  comment: Joi.string().required(),
  volunteerTime: Joi.string().required(),
  recruitment: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  address: Joi.number().required(),
  image: Joi.string().required(),
  meetingStatus: Joi.string().required(),
  participation: Joi.number().required(),
});

const checkCompletePostFrom = (from) => (req, res, next) => {
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
  if (author === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: author는 필수값입니다.`
      )
    );
  }
  next();
};

const checkPostIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinPostConditionFrom = (from) => (req, res, next) => {
  const { title, content, author } = req[from];
  if (title === undefined && content === undefined && author === undefined) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: title, content, author중 최소 하나는 필요합니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompletePostFrom,
  checkPostIdFrom,
  checkMinPostConditionFrom,
};
