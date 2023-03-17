const express = require("express");
const { adminController } = require("../controller");
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

module.exports = adminRouter;