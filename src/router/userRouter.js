const express = require("express");
const { userController } = require("../controller");
const { userMiddleware } = require("../middleware");

const userRouter = express.Router();

/**  
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관리
 */

/**
 * @swagger
 * /api/v1/users/join:
 *  post:
 *    summary: "회원가입"
 *    description: "POST method로 새로운 사용자 생성."
 *    tags: [Users]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다.
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: "사용자 이름"
 *              email:
 *                type: string
 *                description: "사용자 이메일"
 *              password:
 *                type: string
 *                description: "비밀번호"
 *              address:
 *                type: string
 *                description: "주소"
 *              phoneNumber:
 *                type: string
 *                description: "휴대폰 번호"
 *              nickname:
 *                type: string
 *                description: "작성자"
 */

// 회원가입
userRouter.post(
  "/join",
  userMiddleware.checkJoinFrom("body"),
  userController.createUser
);

module.exports = userRouter;
