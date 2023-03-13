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
    participation,
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
      participation,
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
    participation,
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
      participation,
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
      participation,
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
      participation,
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
    participation,
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
      participation,
    });
    return deletedMeetings;
  },
};

module.exports = meetingService;
