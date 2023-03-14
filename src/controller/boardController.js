const { createBoard } = require("../data-access/boardDAO");
const { boardService } = require("../service");


const boardController = {

    async createBoard(req, res, next) {
        try {
            const { author, title, content, image } = req.body;
            const newBoard = await boardService.createBoard({ author, title, content, image });
            res.status(201).json(newBoard);
        } catch (error) {
            next(error)
        }
    },

    async getBoardAll(req, res, next) {
        try {
            const boardAll = await boardService.getBoardAll();
            res.json(boardAll);

        } catch (error) {
            next(error);
        }
    },



    async getBoard(req, res, next) {
        try {
            const { id } = req.params;
            const board = await boardService.getBoard(id);
            res.json(board);
        } catch (error) {
            next(error);
        }
    },

    async editBoard(req, res, next) {
        try {
            const { id } = req.params;
            const { title, content, image } = req.body;
            const updatedBoard = await boardService.updateBoard(id, { title, content, image });
            res.json(updatedBoard);
        } catch (error) {
            next(error);
        }
    }

};

module.exports = boardController;
