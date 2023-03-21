const { recruitmentDAO } = require("../data-access");

const recruitmentService = {
  //생성
  async createRecruitment({
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
    const createdRecruitment = await recruitmentDAO.create({
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
      borough,
      title,
      volunteerTime,
      author,
      address,
      category,
      meetingStatus,
      participants,
    },
    page,
    perPage
  ) {
    const recruitment = await recruitmentDAO.findMany(
      {
        borough,
        title,
        volunteerTime,
        author,
        address,
        category,
        meetingStatus,
        participants,
      },
      page,
      perPage
    );
    return recruitment;
  },

  //모든 모집글 찾기
  async getAllRecruitments(page, perPage) {
    const recruitments = await recruitmentDAO.findAll(page, perPage);
    return recruitments;
  },

  async updateRecruitment(
    id,
    {
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
    }
  ) {
    const updatedRecruitment = await recruitmentDAO.updateOne(id, {
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
    return updatedRecruitment;
  },

  async deleteRecruitment(id) {
    const deletedRecruitment = await recruitmentDAO.deleteOne(id);
    return deletedRecruitment;
  },
  async deleteRecruitments({
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
    const deletedRecruitments = await recruitmentDAO.deleteMany({
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
    return deletedRecruitments;
  },
};

module.exports = recruitmentService;
