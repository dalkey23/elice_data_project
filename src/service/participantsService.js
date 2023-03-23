const { participantsDAO, recruitmentDAO } = require("../data-access");

const participantsService = {
  // 새로운 참가자 추가
  async addParticipant({ recruitmentId, participantId }) {
    const existedParticipants = await participantsDAO.findOne({
      recruitmentId,
      participantId,
    });

    const recruitmentAuthor = await recruitmentDAO.findAuthor({
      recruitmentId,
      participantId,
    });

    console.log(recruitmentAuthor);

    if (existedParticipants) {
      throw new Error("이미 참가하셨습니다.");
    }

    if (recruitmentAuthor) {
      throw new Error("자신이 개설한 모집글에는 참여신청을 할 수 없습니다.");
    }

    const createdParticipant = await participantsDAO.create({
      recruitmentId,
      participantId,
    });
    return createdParticipant;
  },

  // 특정 모집글에 대한 참가자 목록 조회
  async getParticipantsByRecruitmentId(recruitmentId) {
    const participants = await participantsDAO.findParticipantsByRecruitmentId(
      recruitmentId
    );
    return participants;
  },

  // 개설/참여한 모든 게시글 목록 조회
  async getParticipantsByRecruitmentIds(
    { recruitmentId, participantId },
    page,
    perPage
  ) {
    const recruitmentIds = await participantsDAO.findMany(
      { recruitmentId, participantId },
      page,
      perPage
    );
    return recruitmentIds;
  },

  // 모집글 별 참가자 삭제
  async deleteParticipant(recruitmentId, participantId) {
    const deletedParticipant = await participantsDAO.deleteParticipant(
      recruitmentId,
      participantId
    );
    return deletedParticipant;
  },
};

module.exports = participantsService;
