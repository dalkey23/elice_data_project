const Joi = require("joi");
const JoiObjectId = require("joi-objectid")(Joi);
const AppError = require("../misc/AppError");
const commonErrors = require("../misc/commonErrors");

const schema = Joi.object({
  recruitmentId: JoiObjectId().required(),
  participantId: JoiObjectId(),
});

const checkCompleteParticipantsFrom = (from) => async (req, res, next) => {
  const { recruitmentId, participantId } = req[from];
  try {
    await schema.validateAsync({
      recruitmentId,
      participantId,
    });
    next();
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
};

const checkRecruitmentIdFrom = (from) => (req, res, next) => {
  const { id } = req[from];
  try {
    if (id === undefined) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: id는 필수값입니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkMinParticipantIdConditionFrom = (from) => (req, res, next) => {
  const { recruitmentId, participantId } = req[from];
  try {
    if (recruitmentId === undefined && participantId === undefined) {
      throw new AppError(
        commonErrors.inputError,
        400,
        `${from}: 값이 최소 하나는 필요합니다.`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCompleteParticipantsFrom,
  checkRecruitmentIdFrom,
  checkMinParticipantIdConditionFrom,
};
