const { meetingDAO } = require("../data-access");

const meetingService = {
  async createMeeting({
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
  }) {
    const createdMeeting = await meetingDAO.create({
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
    return createdMeeting;
  },
  async getMeeting(id) {
    const meeting = await meetingDAO.findOne(id);
    return meeting;
  },
  async getMeetings({
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
  }) {
    const meetings = await meetingDAO.findMany({
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
    return meetings;
  },
  async updateMeeting(
    id,
    {
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
    }
  ) {
    const updatedMeeting = await meetingDAO.updateOne(id, {
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
    return updatedMeeting;
  },
  async deleteMeeting(id) {
    const deletedMeeting = await meetingDAO.deleteOne(id);
    return deletedMeeting;
  },
  async deleteMeeting({
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
  }) {
    const deletedMeetings = await meetingDAO.deleteMany({
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
    return deletedMeetings;
  },
};

module.exports = meetingService;
