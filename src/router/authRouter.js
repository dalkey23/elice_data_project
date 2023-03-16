const express = require("express");
const passport = require("passport");
const { userMiddleware } = require("../middleware");
const { authMiddleware } = require("../middleware");
const { authController } = require("../controller");
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 인증 관리
 */

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

authRouter.post(
  "/login",
  authMiddleware.checkLoginFrom("body"),
  authMiddleware.existsToken,
  passport.authenticate("local"),
  authController.login
);

authRouter.post(
  "/logout", 
  authController.logout
);

module.exports = authRouter;
