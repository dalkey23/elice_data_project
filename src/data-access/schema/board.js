const { mongoose, Schema } = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    author: {
      // type: Schema.Types.ObjectId,
      // ref: "User",
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      required: false,

    },
  },
  {
    collection: "Board",
    timestamps: true,
  }
);

module.exports = boardSchema;