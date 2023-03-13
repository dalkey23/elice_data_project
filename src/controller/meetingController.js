const { meetingService } = require("../service");
const util = require("../misc/util");

const meetingController = {
  async createMeeting(req, res, next) {
    try {
      const {
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
      } = req.body;
      const meeting = await meetingService.createMeeting({
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
      res.status(201).json(util.buildResponse(meeting));
    } catch (error) {
      next(error);
    }
  },
  async getMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const meeting = await meetingService.getMeeting(id);
      res.json(util.buildResponse(meeting));
    } catch (error) {
      next(error);
    }
  },
  async getMeetings(req, res, next) {
    try {
      const {
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
      } = req.query;
      const meetings = await meetingService.getMeetings({
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
      res.json(util.buildResponse(meetings));
    } catch (error) {
      next(error);
    }
  },

  async getAllMeetings(req, res, next) {
    try {
      //페이지 번호
      const page = Number(req.query.page || 1);
      //페이지 당 상품 개수
      const perPage = Number(req.query.perPage || 10);

      const { meetings, total, totalPage } =
        await meetingService.getAllMeetings(page, perPage);
      res.json(
        util.buildResponse({
          page: page,
          perPage: perPage,
          totalPage: totalPage,
          meetingCount: total,
          meetings,
        })
      );
    } catch (error) {
      next(error);
    }
  },

  async putMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const {
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
      } = req.body;
      const meeting = await meetingService.updatePost(id, {
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
      res.json(util.buildResponse(meeting));
    } catch (error) {
      next(error);
    }
  },
  async deleteMeeting(req, res, next) {
    try {
      const { id } = req.params;
      const meeting = await meetingService.deleteMeeting(id);
      res.json(util.buildResponse(meeting));
    } catch (error) {
      next(error);
    }
  },
  async deleteMeetings(req, res, next) {
    try {
      const {
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
      } = req.body;
      const meetings = await meetingService.deleteMeetings({
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
      res.json(util.buildResponse(meetings));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = meetingController;
