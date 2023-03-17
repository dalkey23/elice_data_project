const mongoose = require("mongoose");

const recruitmentSchema = new mongoose.Schema(
  {
    // 자치구별
    borough: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Borough",
    },
    // 제목
    title: {
      type: String,
      required: true,
    },
    // 댓글
    comment: {
      type: String,
      required: true,
    },
    // 봉사 시간
    volunteerTime: {
      type: String,
      required: true,
    },
    // 총 모집인원
    recruitments: {
      type: Number,
      required: true,
    },
    // 글의 코멘트
    content: {
      type: String,
      required: true,
    },
    // 글 작성자
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // 이미지
    image: {
      type: String,
      required: true,
    },
    // 주소
    address: {
      type: String,
      required: true,
    },
    // 장기와 단기
    category: {
      type: String,
      required: true,
    },
    // 참가자명단
    participation: [
      {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "RecruitmentParticipaint",
      },
    ],
    // 모집중, 모집완료
    meetingStatus: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Meeting",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = recruitmentSchema;
