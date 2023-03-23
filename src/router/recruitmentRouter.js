const express = require("express");
const { recruitmentController } = require("../controller");
const { recruitmentMiddleware } = require("../middleware");
const { participantsMiddleware } = require("../middleware");
const { authMiddleware } = require("../middleware");
const { participantsController } = require("../controller");

/**
 * @swagger
 * tags:
 *   name: Recruitment
 *   description: 모집글 관리
 */
const recruitmentRouter = express.Router();

/**
 * @swagger
 * /api/v1/recruitment:
 *  post:
 *    summary: "모집글 등록"
 *    tags: [Recruitment]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recruitment'
 *    responses:
 *      201:
 *        description: 생성된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.post(
  "/",
  authMiddleware.verifyLogin,
  recruitmentMiddleware.checkCompleteRecruitmentFrom("body"),
  recruitmentController.createRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  get:
 *    summary: "특정 모집글 조회"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 조회된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.get(
  "/:id",
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.getRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment:
 *  get:
 *    summary: "모든 모집글 조회 (자치구별로 선택 가능)"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: query
 *        name: boroughId
 *        schema:
 *          type: integer
 *        description: 자치구별로 게시글을 조회하려면 boroughId 값을 전달하세요.
 *        example: 1
 *        required: false
 *    responses:
 *      200:
 *        description: 조회된 모든 모집글 목록
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.get("/", recruitmentController.getRecruitments);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  put:
 *    summary: "모집글 수정"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Recruitment'
 *    responses:
 *      200:
 *        description: 수정된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.put(
  "/:id",
  authMiddleware.verifyRecuitmentUser("params"),
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentMiddleware.checkMinRecruitmentConditionFrom("body"),
  recruitmentController.putRecruitment
);

/**
 * @swagger
 * /api/v1/recruitment/{id}:
 *  delete:
 *    summary: "모집글 삭제"
 *    tags: [Recruitment]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: 모집글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: 삭제된 모집글 정보
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Recruitment'
 */
recruitmentRouter.delete(
  "/:id",
  authMiddleware.verifyRecuitmentUser("params"),
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.deleteRecruitment
);

// 모집글 별 참여자 목록조회
recruitmentRouter.get(
  "/:recruitmentId/participants",
  authMiddleware.verifyLogin,
  participantsController.getParticipantsByRecruitmentId
);

// 참여자 추가
recruitmentRouter.post(
  "/:recruitmentId/participants",
  authMiddleware.verifyLogin,
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsController.addParticipant
);

// 모집글 별 참가자 탈퇴
recruitmentRouter.delete(
  "/:recruitmentId/participants/:participantId",
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsController.deleteParticipant
);

// 참여한 개시글 목록
recruitmentRouter.get(
  "/:participantId",
  participantsController.getParticipantIds
);

// 개설한 게시글 목록
recruitmentRouter.get(
  "/:recruitmentId",
  authMiddleware.verifyAuthorizedUser("body")
);

//댓글
recruitmentRouter.post(
  "/:recruitmentId/comment",
  authMiddleware.verifyLogin,
  recruitmentController.createComment
);

recruitmentRouter.put(
  "/:recruitmentId/comment/:commentId",
  recruitmentController.editComment
);

recruitmentRouter.delete(
  "/:recruitmentId/comment/:commentId",
  recruitmentController.deleteComment
);

module.exports = recruitmentRouter;
