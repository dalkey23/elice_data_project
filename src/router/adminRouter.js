const express = require("express");
const { adminController, recruitmentController, boardController } = require("../controller");
const { authMiddleware } = require("../middleware");

const adminRouter = express.Router();

// 회원 목록 조회
adminRouter.get(
  "/users",
  authMiddleware.verifyAdmin,
  adminController.getUserslist
);

// 회원 정보 수정
adminRouter.put(
  "/users/:id",
  authMiddleware.verifyAdmin,
  adminController.updateUser
);

// 회원 탈퇴
adminRouter.delete(
  "/users/:id",
  authMiddleware.verifyAdmin,
  adminController.deleteUser
);

// 모집글 삭제
adminRouter.delete(
  "/recruitment/:id",
  authMiddleware.verifyAdmin,
  recruitmentController.deleteRecruitment
)

// 게시글 삭제
adminRouter.delete(
  "/board/:id",
  authMiddleware.verifyAdmin,
  boardController.deleteBoard
)

// 모집글 댓글 삭제
adminRouter.delete(
  "/",
  authMiddleware.verifyAdmin,
  boardController.deleteComment
)

// 게시글 댓글 삭제(보완 필요)
adminRouter.delete(
  "/",
  authMiddleware.verifyAdmin,
)

module.exports = adminRouter;