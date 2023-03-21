const { boardDAO } = require("../data-access");

const boardService = {
  async createBoard(user , { title, content, image }) {
    const createBoard = await boardDAO.createBoard(user , {
      title,
      content,
      image,
    });
    return createBoard;
  },

  async getBoardAll(page, perPage) {
    const boardAll = await boardDAO.findAll(page, perPage);
    return boardAll;
  },

  async getBoard(id) {
    const board = await boardDAO.findOne(id);
    return board;
  },

  async updateBoard(id, { title, content, image }) {
    const updateBoard = await boardDAO.updateOne(id, { title, content, image });
    return updateBoard;
  },

  async deleteBoard(id) {
    const deleteBoard = await boardDAO.deleteOne(id);
    return deleteBoard;
  },

  async createComment(boardId, writer, content) {
    const comment = await boardDAO.createComment(boardId, writer, content);
    return comment;
  },
  async updateComment(id, comment_id, { title, content }) {
    const updateComment = await boardDAO.updateComment(id, comment_id, {
      title,
      content,
    });
    return updateComment;
  },

  async deleteComment(id, comment_id) {
    const deletedComment = await boardDAO.deleteComment(id, comment_id);
    return deletedComment;
  },
};

module.exports = boardService;
