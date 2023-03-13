const { meetingService } = require("../service");
const util = require("../misc/util");

const meetingController = {
  async meetingPost(req, res, next) {
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
      });
      res.json(util.buildResponse(meetings));
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
      });
      res.json(util.buildResponse(meetings));
    } catch (error) {
      next(error);
    }
  },
};

module.exports = meetingController;
