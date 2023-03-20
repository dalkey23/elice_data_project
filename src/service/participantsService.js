const { participantsDAO } = require("../data-access");

const participantsService = {
  // 새로운 참가자 추가
  async addParticipant({ recruitmentId, participantId }) {
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

  // 모집글 별 참가자 삭제
  async removeParticipant(recruitmentId, participantId) {
    const deletedParticipant = await participantsDAO.deleteParticipant(
      recruitmentId,
      participantId
    );
    return deletedParticipant;
  },
};

module.exports = participantsService;
