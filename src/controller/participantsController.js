const { participantsService } = require("../service");
const util = require("../misc/util");

const participantsController = {
  // 새로운 참가자 추가
  async addParticipant(req, res) {
    try {
      const { recruitmentId, participantId } = req.body;
      const createdParticipant = await participantsService.addParticipant({
        recruitmentId,
        participantId,
      });
      res.status(201).json(util.buildResponse(createdParticipant));
    } catch (error) {
      next(error);
    }
  },

  // 특정 모집글에 대한 참가자 목록 조회
  async getParticipantsByRecruitmentId(req, res) {
    try {
      const { recruitmentId } = req.params;
      const participants =
        await participantsService.getParticipantsByRecruitmentId(recruitmentId);
      res.status(200).json(util.buildResponse(participants));
    } catch (error) {
      next(error);
    }
  },

  // 모집글 별 참가자 삭제
  async deleteParticipant(req, res) {
    try {
      const { recruitmentId, participantId } = req.params;
      const deletedParticipant = await participantsService.deleteParticipant(
        recruitmentId,
        participantId
      );
      res.status(200).json(util.buildResponse(deletedParticipant));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = participantsController;
