const { Board, Comment, User } = require("./model");
const util = require("../misc/util");

const boardDAO = {
  async createBoard(userId, { title, content, image }) {
    const newBoard = new Board({ author: userId, title, content, image });
    await newBoard.save();
    return newBoard.toObject();
  },

  async findAll(page, perPage) {
    const [total, boards] = await Promise.all([
      Board.countDocuments({}),
      Board.find().populate("author", "nickname")
        .lean()
        .sort({ createdAt: -1 })
        .skip(perPage * (page - 1))
        .limit(perPage),
    ]);
    const totalPage = Math.ceil(total / perPage);
    return { boards, total, totalPage };
  },

  async findOne(id) {
    const [board, comments] = await Promise.all([
      Board.findById(id).populate("author", "nickname"),
      Comment.find({ parentId: id, category: "board" }).populate("writer", "nickname"),
    ]);
    return { board, comments };
  },

  async updateOne(id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      content: toUpdate.content,
      image: toUpdate.image,
    });
    const updatedBaord = await Board.findByIdAndUpdate(id, sanitizedToUpdate);
    return updatedBaord;
  },

  async deleteOne(id) {
    const deleteBoard = await Board.findByIdAndDelete(id);
    return deleteBoard;
  },

  async createComment(userId, { boardId, content }) {
    const newComment = new Comment({
      parentId: boardId,
      writer: userId,
      content,
      category: "board",
    });
    await newComment.save();
    return newComment.toObject();
  },

  async updateComment(id, comment_id, toUpdate) {
    const sanitizedToUpdate = util.sanitizeObject({
      title: toUpdate.title,
      content: toUpdate.content,
    });
    const updateComment = await Comment.findByIdAndUpdate(
      { _id: comment_id },
      sanitizedToUpdate
    );
    return updateComment;
  },

  async deleteComment(id, comment_id) {
    const deletedComment = await Comment.findByIdAndDelete({ _id: comment_id });
    return deletedComment;
  },
};

module.exports = boardDAO;
