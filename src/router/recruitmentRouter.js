const express = require("express");
const { recruitmentController } = require("../controller");
const { recruitmentMiddleware } = require("../middleware");
const { participantsMiddleware } = require("../middleware");
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
 * /api/v1/recruitment/all:
 *  get:
 *    summary: "모든 모집글 조회"
 *    tags: [Recruitment]
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
recruitmentRouter.get("/", recruitmentController.getAllRecruitments);

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
  recruitmentMiddleware.checkRecruitmentIdFrom("params"),
  recruitmentController.deleteRecruitment
);

// 자치구별 모집글 조회
recruitmentRouter.get(
  "/borough/:borough",
  recruitmentController.getRecruitments
);

// 모집글 별 참여자 목록조회
recruitmentRouter.get(
  "/:recruitmentId/participants",
  participantsController.getParticipantsByRecruitmentId
);

// 참여자 추가
recruitmentRouter.post(
  "/:recruitmentId/participants",
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsController.addParticipant
);

// 모집글 별 참가자 탈퇴
recruitmentRouter.delete(
  "/:recruitmentId/participants/:participantId",
  participantsMiddleware.checkRecruitmentIdFrom("params"),
  participantsMiddleware.checkMinParticipantIdConditionFrom("body"),
  participantsController.deleteParticipant
);

module.exports = recruitmentRouter;
