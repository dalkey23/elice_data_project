const { recruitmentDAO } = require("../data-access");

const recruitmentService = {
  //생성
  async createRecruitment({
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
    const createdRecruitment = await recruitmentDAO.create({
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
    return createdRecruitment;
  },

  // id값으로 모집글 하나 찾기
  async getRecruitment(id) {
    const recruitment = await recruitmentDAO.findOne(id);
    return recruitment;
  },

  //모집글들 찾기
  async getRecruitments(
    {
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
    },
    page,
    perPage
  ) {
    const recruitments = await recruitmentDAO.findMany(
      {
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
      },
      page,
      perPage
    );
    return recruitments;
  },

  //모든 모집글 찾기
  async getAllRecruitments(page, perPage) {
    const recruitments = await recruitmentDAO.findAll(page, perPage);
    return recruitments;
  },

  async updateRecruitment(
    id,
    {
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
    }
  ) {
    const updatedRecruitment = await recruitmentDAO.updateOne(id, {
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
    return updatedRecruitment;
  },
  async deleteRecruitment(id) {
    const deletedRecruitment = await recruitmentDAO.deleteOne(id);
    return deletedRecruitment;
  },
  async deleteRecruitments({
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
    const deletedRecruitments = await recruitmentDAO.deleteMany({
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
    return deletedRecruitments;
  },
};

module.exports = recruitmentService;
