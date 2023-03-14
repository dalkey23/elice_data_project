const { boardDAO } = require('../data-access');

const boardService = {

    async createBoard({ author, title, content, image }) {
        const createBoard = await boardDAO.createBoard({ author, title, content, image });
        return createBoard;
    },

    async getBoardAll() {
        const boardAll = await boardDAO.findAll();
        return boardAll;
    },

    async getBoard(id) {
        const board = await boardDAO.findOne(id);
        return board;
    }


};

module.exports = boardService;