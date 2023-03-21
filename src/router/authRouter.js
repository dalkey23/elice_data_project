const express = require("express");
const passport = require("passport");
const { authMiddleware, userMiddleware } = require("../middleware");
const { authController, userController } = require("../controller");

const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관리
 */

/**
 * @swagger
 * /api/v1/auth/join:
 *  post:
 *    summary: "회원가입"
 *    description: "새로운 사용자 생성."
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
 *    responses:     
 *      "201":
 *        description: 회원가입
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                data:
 *                  type: object
 *                  example: [{
                      "error": null,
                      "data": {
                          "name": "아무개",
                          "email": "email@gmail.com",
                          "password": "hashedPassword",
                          "address": "address",
                          "phoneNumber": "010-1234-5678",
                          "nickname": "닉네임",
                          "profileImage": null,
                          "userType": "user",
                          "_id": "_id",
                          "createdAt": "2023-03-14T07:28:36.874Z",
                          "updatedAt": "2023-03-14T07:28:36.874Z",
                          "__v": 0
                      }
                  }]
 *                  
 */

// 회원가입
authRouter.post(
  "/join",
  userMiddleware.checkJoinFrom("body"),
  userController.createUser,
);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: "로그인"
 *    description: "사용자 인증"
 *    tags: [Users]
 *    requestBody:
 *      description: 이메일, 비밀번호
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: "사용자 이메일"
 *              password:
 *                type: string
 *                description: "비밀번호"
 */

// 로그인
authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom("body"),
  authMiddleware.existsToken,
  passport.authenticate("local", { session: false }),
  authController.login
);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: "로그아웃"
 *    description: "인증 해제"
 *    tags: [Users]
 *    requestBody:
 *      description: 
 *      required: false
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 */

// 로그아웃
authRouter.post(
  "/logout", 
  authController.logout
);

// 사용자 정보 삭제 (회원 탈퇴)
authRouter.delete(
  "/:id",
  authMiddleware.verifyAuthorizedUser("params"),
  userMiddleware.checkUserIdFrom("params"),
  userController.deleteUser,
);

module.exports = authRouter;
