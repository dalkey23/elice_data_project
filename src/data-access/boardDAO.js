const { Board } = require("./model")
const util = require("../misc/util")

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
    },

    async updateOne(id, toUpdate) {
        const sanitizedToUpdate = util.sanitizeObject({
            title: toUpdate.title,
            content: toUpdate.content,
            image: toUpdate.image,
        });

        const updatedBaord = await Board.findByIdAndUpdate(id, sanitizedToUpdate)

        return updatedBaord;
    },

    async deleteOne(id) {
        const deleteBoard = await Board.findByIdAndDelete(id)
        return deleteBoard;

    }
};

module.exports = boardDAO;