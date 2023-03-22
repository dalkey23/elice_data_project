const express = require("express");
const { boardController } = require("../controller");
const { boardMiddleware, authMiddleware } = require("../middleware");

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: 커뮤니티 게시판 관리
 */
const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/board:
 *  post:
 *    summary: "게시글 등록"
 *    description: "POST 방식으로 게시글를 등록한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 등록)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              author:
 *                type: ObjectId
 *                description: "작성자"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 *              image:
 *                type: string
 *                description: "게시들 이미지"
 *    responses:
 *      "200":
 *        description: 게시글 작성
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 */
boardRouter.post(
  "/",
  authMiddleware.verifyLogin,
  boardMiddleware.checkCompleteBoardFrom("body"),
  boardController.createBoard
);

/**
 * @swagger
 * /api/v1/board:
 *  get:
 *    summary: "게시글조회"
 *    description: "게시글 목록을 조회한다"
 *    tags: [Board]
 *    parameters:
 *      - in: query
 *        name: page
 *        required: false
 *        description: 현재페이지
 *        schema:
 *          type: string
 *      - in: query
 *        name: perPage
 *        required: false
 *        description: 게시글 수
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}, ...]
 */
boardRouter.get("/", boardController.getBoards);

/**
 * @swagger
 * /api/v1/board/{id}:
 *  get:
 *    summary: "게시글 상세조회"
 *    description: "특정 게시물 내용과 댓글을 조회한다"
 *    tags: [Board]
 *    parameters:
 *      - in: path
 *        name: board_id
 *        required: true
 *        description: 게시글 아이디
 *        schema:
 *          type: string
 *    responses:
 *      "200":
 *        description: 게시글 상세조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 *                comments:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","content": "test content","writer": "t123"}, ...]
 */
boardRouter.get(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  boardController.getBoard
);

/**
 * @swagger
 * /api/v1/board:
 *  put:
 *    summary: "게시글 수정"
 *    description: "PUT 방식으로 게시글을 수정한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 수정정)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              author:
 *                type: ObjectId
 *                description: "작성자"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 *              image:
 *                type: string
 *                description: "게시들 이미지"
 *    responses:
 *      "200":
 *        description: 게시글 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 */
boardRouter.put(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  authMiddleware.verifyBoardUser("params"),
  boardMiddleware.checkMinBoardConditionFrom("body"),
  boardController.editBoard
);

/**
 * @swagger
 * /api/v1/board:
 *  put:
 *    summary: "게시글 수정"
 *    description: "PUT 방식으로 게시글을 수정한다."
 *    tags: [Board]
 *    requestBody:
 *      description: 사용자가 서버로 전달하는 값에 따라 결과 값은 다릅니다. (게시글 수정정)
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              author:
 *                type: ObjectId
 *                description: "작성자"
 *              title:
 *                type: string
 *                description: "게시글 제목"
 *              content:
 *                type: string
 *                description: "게시들 내용"
 *              image:
 *                type: string
 *                description: "게시들 이미지"
 *    responses:
 *      "200":
 *        description: 게시글 조회
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                ok:
 *                  type: boolean
 *                boards:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": "image url"}]
 */
boardRouter.delete(
  "/:id",
  boardMiddleware.checkBoardIdFrom("params"),
  authMiddleware.verifyBoardUser("params"),
  boardController.deleteBoard
);

// 댓글
boardRouter.post(
  "/:boardId/comment",
  authMiddleware.verifyLogin,
  boardController.createComment
);

boardRouter.put(
  "/:boardId/comment/:commentId",
  authMiddleware.verifyLogin,
  boardController.editComment
);

boardRouter.delete(
  "/:boardId/comment/:commentId",
  authMiddleware.verifyLogin,
  boardController.deleteComment
);

module.exports = boardRouter;
