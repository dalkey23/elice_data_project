const { Recruitment } = require("./model");
const util = require("../misc/util");

// mongoose 모듈에서 생성된 Recruitment 스키마를 사용하여 CRUD 작업을 수행하는 recruitmentDAO 객체
const recruitmentDAO = {
  // 새로운 모집글 생성
  async create({
    borough,
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
    participants,
  }) {
    // Recruitment 스키마를 이용하여 새로운 모집글 생성
    const recruitment = new Recruitment({
      borough,
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
      participants,
    });
    // MongoDB에 저장
    await recruitment.save();
    // 생성된 회의를 JavaScript 객체로 변환하여 반환
    return recruitment.toObject();
  },

  // ID를 사용하여 모집글을 검색
  async findOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 검색
    const plainRecruitment = await Recruitment.findById(id)
      .populate("borough")
      .populate("author")
      .populate("participants")
      .lean();
    // 검색된 회의를 JavaScript 객체로 변환하여 반환
    return plainRecruitment;
  },

  // 필터를 사용하여 모집글을 검색
  async findMany(filter, page, perPage) {
    const sanitizedFilter = util.sanitizeObject({
      borough: filter.borough,
      title: filter.title,
      author: filter.author,
      address: filter.address,
      category: filter.category,
      meetingStatus: filter.meetingStatus,
      participants: filter.participants,
    });
    const [total, recruitments] = await Promise.all([
      Recruitment.countDocuments(sanitizedFilter),
      Recruitment.find(sanitizedFilter)
        .populate("borough")
        .populate("author")
        .populate("participants")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { recruitments, total, totalPage };
  },

  //

  // // 페이지별 모든 모집글
  // async findAll(page, perPage) {
  //   const [total, recruitments] = await Promise.all([
  //     Recruitment.countDocuments({}),
  //     Recruitment.find()
  //       .populate("borough")
  //       .populate("author")
  //       .populate("participants")
  //       .lean()
  //       .sort({ createdAt: -1 })
  //       .skip(perPage * (page - 1))
  //       .limit(perPage),
  //   ]);
  //   const totalPage = Math.ceil(total / perPage);
  //   return { recruitments, total, totalPage };
  // },

  // ID를 사용하여 모집글 정보를 업데이트
  async updateOne(id, toUpdate) {
    // 업데이트할 정보를 purify-object 모듈을 사용하여 정제
    const sanitizedToUpdate = util.sanitizeObject({
      borough: toUpdate.borough,
      title: toUpdate.title,
      comment: toUpdate.comment,
      volunteerTime: toUpdate.volunteerTime,
      recruitments: toUpdate.recruitments,
      content: toUpdate.content,
      image: toUpdate.image,
      address: toUpdate.address,
      category: toUpdate.category,
      meetingStatus: toUpdate.meetingStatus,
      participants: toUpdate.participants,
    });
    // MongoDB에서 ID에 해당하는 모집글을 업데이트하고 새로운 버전의 모집글을 반환
    const plainUpdatedRecruitment = await Recruitment.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true, // 유효성 검사를 실행
        new: true, // 업데이트된 버전의 모집글을 반환
      }
    )
      .populate("borough")
      .populate("author")
      .populate("participants")
      .lean();
    // 업데이트된 회의를 JavaScript 객체로 변환하여 반환
    return plainUpdatedRecruitment;
  },

  // ID를 사용하여 회의를 삭제
  async deleteOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 삭제하고 삭제된 모집글을 반환
    const plainDeletedRecruitment = await Recruitment.findByIdAndDelete(
      id
    ).lean();
    // 삭제된 회의를 JavaScript 객체로 변환하여 반환
    return plainDeletedRecruitment;
  },

  // 필터를 사용하여 여러 모집글을 삭제
  async deleteMany(condition) {
    // 삭제 조건에 사용될 필터를 purify-object 모듈을 사용하여 정제
    const sanitizedCondition = util.sanitizeObject({
      borough: condition.borough,
      title: condition.title,
      author: condition.author,
      comment: condition.comment,
      volunteerTime: condition.volunteerTime,
      recruitments: condition.recruitments,
      content: condition.content,
      image: condition.image,
      address: condition.address,
      category: condition.category,
      meetingStatus: condition.meeting,
      participants: condition.participants,
    });
    // MongoDB에서 조건에 해당하는 모든 모집글을 삭제하고 삭제된 모집글 수를 반환
    const plainDeletedRecruitments = await Recruitment.deleteMany(
      sanitizedCondition
    ).lean();
    // 삭제된 모집글의 수를 반환
    return plainDeletedRecruitments;
  },
};

module.exports = recruitmentDAO;
