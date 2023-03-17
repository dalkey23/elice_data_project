const { recruitmentService } = require("../service");
const util = require("../misc/util");

const recruitmentController = {
  async createRecruitment(req, res, next) {
    try {
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
      } = req.body;
      const recruitment = await recruitmentService.createRecruitment({
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
      res.status(201).json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async getRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const recruitment = await recruitmentService.getRecruitment(id);
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async getRecruitments(req, res, next) {
    try {
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
      } = req.query;
      const Recruitments = await recruitmentService.getRecruitments({
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
      res.json(util.buildResponse(Recruitments));
    } catch (error) {
      next(error);
    }
  },

  async getAllRecruitments(req, res, next) {
    try {
      //페이지 번호
      const page = Number(req.query.page || 1);
      //페이지 당 상품 개수
      const perPage = Number(req.query.perPage || 6);

      const { recruitments, total, totalPage } =
        await recruitmentService.getAllRecruitments(page, perPage);
      res.json(
        util.buildResponse({
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          recruitmentCount: total,
          recruitments,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  async putRecruitment(req, res, next) {
    try {
      const { id } = req.params;
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
      } = req.body;
      const recruitment = await recruitmentService.updateRecruitment(id, {
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
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async deleteRecruitment(req, res, next) {
    try {
      const { id } = req.params;
      const recruitment = await recruitmentService.deleteRecruitment(id);
      res.json(util.buildResponse(recruitment));
    } catch (error) {
      next(error);
    }
  },
  async deleteRecruitments(req, res, next) {
    try {
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
      } = req.body;
      const Recruitments = await recruitmentService.deleteRecruitments({
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
      res.json(util.buildResponse(Recruitments));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = recruitmentController;
