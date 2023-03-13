const { Meeting } = require("./model");
const util = require("../misc/util");

// mongoose 모듈에서 생성된 Meeting 스키마를 사용하여 CRUD 작업을 수행하는 meetingDAO 객체
const meetingDAO = {
  // 새로운 모집글 생성
  async create({
    title,
    comment,
    volunteerTime,
    recruitment,
    content,
    author,
    image,
    address,
    category,
    meetingStatus,
    participation,
  }) {
    // Meeting 스키마를 이용하여 새로운 모집글 생성
    const meeting = new Meeting({
      title,
      comment,
      volunteerTime,
      recruitment,
      content,
      author,
      image,
      address,
      category,
      meetingStatus,
      participation,
    });
    // MongoDB에 저장
    await meeting.save();
    // 생성된 회의를 JavaScript 객체로 변환하여 반환
    return meeting.toObject();
  },
  // ID를 사용하여 모집글을 검색
  async findOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 검색
    const plainMeeting = await Meeting.findById(id).lean();
    // 검색된 회의를 JavaScript 객체로 변환하여 반환
    return plainMeeting;
  },
  // 필터를 사용하여 회의를 검색
  async findMany(filter) {
    // 검색 조건에 사용될 필터를 purify-object 모듈을 사용하여 정제
    // 제목, 작성자, 주소, 카테고리, 모집상태
    const sanitizedFilter = util.sanitizeObject({
      title: filter.title,
      author: filter.author,
      comment: filter.comment,
      volunteerTime: filter.volunteerTime,
      recruitment: filter.recruitment,
      content: filter.content,
      image: filter.image,
      address: filter.address,
      category: filter.category,
      meetingStatus: filter.meetingStatus,
      participation: filter.participation,
    });
    // MongoDB에서 필터에 해당하는 모든 모집글 검색
    const plainMeetings = await Meeting.find(sanitizedFilter).lean();
    // 검색된 회의를 JavaScript 객체의 배열로 변환하여 반환
    return plainMeetings;
  },
  // ID를 사용하여 모집글 정보를 업데이트
  async updateOne(id, toUpdate) {
    // 업데이트할 정보를 purify-object 모듈을 사용하여 정제
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      author: toUpdate.author,
      comment: toUpdate.comment,
      volunteerTime: toUpdate.volunteerTime,
      recruitment: toUpdate.recruitment,
      content: toUpdate.content,
      image: toUpdate.image,
      address: toUpdate.address,
      category: toUpdate.category,
      meetingStatus: toUpdate.meetingStatus,
      participation: toUpdate.participation,
    });
    // MongoDB에서 ID에 해당하는 모집글을 업데이트하고 새로운 버전의 모집글을 반환
    const plainUpdatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      sanitizedToUpdate,
      {
        runValidators: true, // 유효성 검사를 실행
        new: true, // 업데이트된 버전의 모집글을 반환
      }
    ).lean();
    // 업데이트된 회의를 JavaScript 객체로 변환하여 반환
    return plainUpdatedMeeting;
  },
  // ID를 사용하여 회의를 삭제
  async deleteOne(id) {
    // MongoDB에서 ID에 해당하는 모집글 삭제하고 삭제된 모집글을 반환
    const plainDeletedMeeting = await Meeting.findByIdAndDelete({
      _id: id,
    }).lean();
    // 삭제된 회의를 JavaScript 객체로 변환하여 반환
    return plainDeletedMeeting;
  },
  // 필터를 사용하여 여러 모집글을 삭제
  async deleteMany(condition) {
    // 삭제 조건에 사용될 필터를 purify-object 모듈을 사용하여 정제
    const sanitizedCondition = util.sanitizeObject({
      title: condition.title,
      author: condition.author,
      comment: condition.comment,
      volunteerTime: condition.volunteerTime,
      recruitment: condition.recruitment,
      content: condition.content,
      image: condition.image,
      address: condition.address,
      category: condition.category,
      meetingStatus: condition.meeting,
      participation: condition.participation,
    });
    // MongoDB에서 조건에 해당하는 모든 모집글을 삭제하고 삭제된 모집글 수를 반환
    const plainDeletedMeetings = await Meeting.deleteMany(
      sanitizedCondition
    ).lean();
    // 삭제된 모집글의 수를 반환
    return plainDeletedMeetings;
  },
};

module.exports = meetingDAO;
