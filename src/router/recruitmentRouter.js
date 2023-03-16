const express = require("express");
const { recruitmentController } = require("../controller");
const { recruitmentMiddleware } = require("../middleware");

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
recruitmentRouter.get("/all", recruitmentController.getAllRecruitments);

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
  meetingMiddleware.checkMinRecruitmentConditionFrom("body"),
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

module.exports = router;
