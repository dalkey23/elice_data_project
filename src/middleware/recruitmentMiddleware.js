const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const schema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  comment: Joi.string().required(),
  volunteerTime: Joi.string().required(),
  recruitments: Joi.number().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  address: Joi.string().required(),
  image: Joi.string().required(),
  meetingStatus: Joi.string().required(),
  participation: Joi.number().required(),
});

const checkCompleteRecruitmentFrom = (from) => async (req, res, next) => {
  const {
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participation,
  } = req[from];
  try {
    await schema.validateAsync({
      title,
      comment,
      volunteerTime,
      recruitments,
      content,
      author,
      image,
      address,
      category,
      meetingStatus,
      participation,
    });
  } catch (error) {
    //Object.entries() 메서드는 객체의 각 속성을 [key, value] 형태의 배열로 변환
    //이렇게 변환된 배열은 reduce() 메서드를 사용하여 하나의 문자열로 합쳐지는데, 이때 [key: value] 형태의 문자열로 변환
    const result = Object.entries(req[from]).reduce((map, [key, value]) => {
      map += `[${key} : ${value}] `;
      return map;
    }, "");
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${result}: 유효한 데이터 셋이 아닙니다.`
      )
    );
  }
  next();
};

const checkRecruitmentIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  if (id === undefined) {
    next(
      new AppError(commonErrors.inputError, 400, `${from}: id는 필수값입니다.`)
    );
  }
  next();
};

const checkMinRecruitmentConditionFrom = (from) => (req, res, next) => {
  const {
    title,
    comment,
    volunteerTime,
    recruitments,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participation,
  } = req[from];
  if (
    title === undefined &&
    content === undefined &&
    author === undefined &&
    comment === undefined &&
    volunteerTime === undefined &&
    recruitments === undefined &&
    image === undefined &&
    address === undefined &&
    category === undefined &&
    meetingStatus === undefined &&
    participation === undefined
  ) {
    next(
      new AppError(
        commonErrors.inputError,
        400,
        `${from}: 값이 최소 하나는 필요합니다.`
      )
    );
  }
  next();
};

module.exports = {
  checkCompleteRecruitmentFrom,
  checkRecruitmentIdFrom,
  checkMinRecruitmentConditionFrom,
};
