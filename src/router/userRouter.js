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
userRouter.post(
  "/join",
  userMiddleware.checkJoinFrom("body"),
  userController.createUser
);

userRouter.put(
  "/:id",
  userMiddleware.checkUserIdFrom("params"),
  userController.updateUser,
);


module.exports = userRouter;
