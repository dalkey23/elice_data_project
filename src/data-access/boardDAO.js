const { Board } = require("./model")
const util = require("../misc/util")

const boardDAO = {

    async createBoard({ author, title, content, image }) {
        const newBoard = new Board({ author, title, content, image });
        await newBoard.save();
        return newBoard.toObject();
    },

    async findAll(page, perPage) {
        const [total, boards] = await Promise.all([
            Board.countDocuments({}),
            Board.find().lean().sort({ createdAt: -1 }).skip(perPage * (page - 1)).limit(perPage),
        ]);
        const totalPage = Math.ceil(total / perPage);

        return { boards, total, totalPage };
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

    },

    async createComment(id, { writer, content }) {
        const board = await Board.findByIdAndUpdate(id, {
            $push: { comments: { writer, content } }
        })

        return board

    }
};

module.exports = boardDAO;