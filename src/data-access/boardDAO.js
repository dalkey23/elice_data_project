const { Board } = require("./model")

const boardDAO = {

    async createBoard({ author, title, content, image }) {
        const newBoard = new Board({ author, title, content, image });
        await newBoard.save();
        return newBoard.toObject();
    },

    async findAll() {
        const boardAll = await Board.find({});
        return boardAll;
    },

    async findOne(id) {
        const board = await Board.findById(id);
        return board;
    }
};

module.exports = boardDAO;