const express = require("express")
const { boardController } = require("../controller")


/**  
 * @swagger
 * tags:
 *   name: Board
 *   description: 커뮤니티 게시판 관리
 */
const boardRouter = express.Router();

/**
 * @swagger
 * /api/v1/board/all:
 *  get: 
 *    summary: "게시글조회"
 *    description: "모든 게시글 조회"
 *    tags: [Board]
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
 *                users:
 *                  type: object
 *                  example: [{"_id": "640b1b002269b4729b8881e9","title": "test123","content": "test content","author": "t123","image": []}]
 */
boardRouter.get("/all", boardController.getBoardAll);

module.exports = boardRouter;