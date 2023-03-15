const { boardDAO } = require('../data-access');

const boardService = {

    async createBoard({ author, title, content, image }) {
        const createBoard = await boardDAO.createBoard({ author, title, content, image });
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
    }


};

module.exports = boardService;