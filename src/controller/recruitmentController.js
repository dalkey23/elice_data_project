const { recruitmentService } = require("../service");
const util = require("../misc/util");

const recruitmentController = {
  async createRecruitment(req, res, next) {
    try {
      const {
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
      } = req.body;
      const recruitment = await recruitmentService.createRecruitment({
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
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
      const {
        borough,
        title,
        volunteerTime,
        author,
        address,
        category,
        meetingStatus,
        participants,
      } = req.query;
      const Recruitments = await recruitmentService.getRecruitments({
        borough,
        title,
        volunteerTime,
        author,
        address,
        category,
        meetingStatus,
        participants,
        page,
        perPage,
      });
      res.json(util.buildResponse(Recruitments));
    } catch (error) {
      next(error);
    }
  },

  async getAllRecruitments(req, res, next) {
    try {
      const page = Number(req.query.page ?? 1);
      const perPage = Number(req.query.perPage ?? 6);
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
      } = req.body;
      const recruitment = await recruitmentService.updateRecruitment(id, {
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
      } = req.body;
      const Recruitments = await recruitmentService.deleteRecruitments({
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
      res.json(util.buildResponse(Recruitments));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = recruitmentController;
