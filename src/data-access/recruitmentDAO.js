const { Recruitment } = require("./model");
const util = require("../misc/util");

// mongoose 모듈에서 생성된 Recruitment 스키마를 사용하여 CRUD 작업을 수행하는 recruitmentDAO 객체
const recruitmentDAO = {
  // 새로운 모집글 생성
  async create({
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
  }) {
    // Recruitment 스키마를 이용하여 새로운 모집글 생성
    // author를 nickname으로 찾아서 변환
    const author = await User.findOne({
      nickname: req.user.nickname,
    });
    const recruitment = new Recruitment({
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
    // MongoDB에 저장
    await recruitment.save();
    // 생성된 회의를 JavaScript 객체로 변환하여 반환
    return recruitment.toObject();
  },
  // ID를 사용하여 모집글을 검색
  async findOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 검색
    const plainRecruitment = await Recruitment.findById(id).lean();
    // 검색된 회의를 JavaScript 객체로 변환하여 반환
    return plainRecruitment;
  },

  // 지원한 봉사모집글

  // 개설한 봉사모집글

  // 필터를 사용하여 모집글을 검색
  async findMany(filter) {
    // 검색 조건에 사용될 필터를 purify-object 모듈을 사용하여 정제
    // 제목, 작성자, 주소, 카테고리, 모집인원
    const sanitizedFilter = util.sanitizeObject({
      title: filter.title,
      author: filter.author,
      recruitments: filter.recruitments,
      content: filter.content,
      address: filter.address,
      category: filter.category,
      meetingStatus: filter.meetingStatus,
      participation: filter.participation,
    });
    const [total, recruitments] = await Promise.all([
      Recruitment.countDocuments({}),
      Recruitment.find(sanitizedFilter)
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { recruitments, total, totalPage };
  },

  //

  // 페이지별 모든 모집글
  async findAll(page, perPage) {
    const [total, recruitments] = await Promise.all([
      Recruitment.countDocuments({}),
      Recruitment.find()
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { recruitments, total, totalPage };
  },

  // ID를 사용하여 모집글 정보를 업데이트
  async updateOne(id, toUpdate) {
    // 업데이트할 정보를 purify-object 모듈을 사용하여 정제
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      author: toUpdate.author,
      comment: toUpdate.comment,
      volunteerTime: toUpdate.volunteerTime,
      recruitments: toUpdate.recruitments,
      content: toUpdate.content,
      image: toUpdate.image,
      address: toUpdate.address,
      category: toUpdate.category,
      meetingStatus: toUpdate.meetingStatus,
      participation: toUpdate.participation,
    });
    // MongoDB에서 ID에 해당하는 모집글을 업데이트하고 새로운 버전의 모집글을 반환
    const plainUpdatedRecruitment = await Recruitment.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true, // 유효성 검사를 실행
        new: true, // 업데이트된 버전의 모집글을 반환
      }
    ).lean();
    // 업데이트된 회의를 JavaScript 객체로 변환하여 반환
    return plainUpdatedRecruitment;
  },

  // ID를 사용하여 회의를 삭제
  async deleteOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 삭제하고 삭제된 모집글을 반환
    const plainDeletedRecruitment = await Recruitment.findByIdAndDelete({
      _id: id,
    }).lean();
    // 삭제된 회의를 JavaScript 객체로 변환하여 반환
    return plainDeletedRecruitment;
  },

  // 필터를 사용하여 여러 모집글을 삭제
  async deleteMany(condition) {
    // 삭제 조건에 사용될 필터를 purify-object 모듈을 사용하여 정제
    const sanitizedCondition = util.sanitizeObject({
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
      participation: condition.participation,
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
