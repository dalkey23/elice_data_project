const { boardDAO } = require('../data-access')

const boardService = {
    async getBoardAll() {
        const boardAll = await boardDAO.findAll();
        return boardAll;
    }


};

module.exports = boardService;