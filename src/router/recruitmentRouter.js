const express = require("express");
const { recruitmentController } = require("../controller");
const { recruitmentMiddleware } = require("../middleware");

/**
 * @swagger
 * tags:
 *   name: recruitment
 *   description: 모집글 관리
 */
const recruitmentRouter = express.Router();

/**
 * @swagger
 * /api/v1/recruitment:
 *  post:
 *    summary: "모집글 등록"
 *    description: "POST 방식으로 게시글를 등록한다."
 *    tags: [Meetings]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (모집글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *                description: "모집글 제목"
 *              content:
 *                type: string
 *                description: "모집글 내용"
 *              author:
 *                type: string
 *                description: "모집글 작성자"
 *              comment:
 *                type: string
 *                description: "모집글 댓글"
 *              volunteerTime:
 *                type: string
 *                description: "봉사시간 대"
 *              recruitment:
 *                type: number
 *                description: "모집 인원수"
 *              image:
 *                type: string
 *                description: "사진"
 *              address:
 *                type: string
 *                description: "모집 장소"
 *              category:
 *                type: string
 *                description: "장기봉사랑 일회성봉사를 나누는 카테고리"
 *              participation:
 *                type: number
 *                default: 0,
 *                description: "현재 참여인원"
 *              meetingStatus:
 *                type: string,
 *                description: "모집 완료 유무"
 */
recruitmentRouter.post(
  "/",
  recruitmentMiddleware.checkCompleteRecruitmentFrom("body"),
  recruitmentController.createRecruitment
);

// 특정id 모집글 조회
/**
 * @swagger
 * /api/v1/recruitment/comment/{_id}:
 *  get:
 *    summary: "특정 게시글조회 Path 방식"
 *    description: "요청 경로에 값을 담아 서버에 보낸다."
 *    tags: [Recruitments]
 *    parameters:
 *      - in: path
 *        name: post_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 조회)
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                users:
 *                  type: object
 *                  example: [{ "id": 1, "name": "post1" }]
 */
recruitmentRouter.get(
  "/:id",
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.getRecruitment
);

// 모든 모집글
recruitmentRouter.get("/all", recruitmentController.getAllRecruitments);

//구 별 모집글
// recruitmentRouter.get(
//   "/borough",
//   recruitmentController.getBoroughRecruitmentController
// );

//모집글 수정
meetingRouter.put(
  "/:id",
  meetingMiddleware.checkMeetingIdFrom("params"),
  meetingMiddleware.checkMinMeetingConditionFrom("body"),
  meetingController.putMeeting
);

//모집글 삭제
meetingRouter.delete(
  "/:id",
  meetingMiddleware.checkPostIdFrom("params"),
  meetingController.deleteMeeting
);

module.exports = router;
