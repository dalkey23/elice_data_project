const {mongoose, Schema} = require("mongoose");

const boardSchema = new mongoose.Schema(
  {
    author: {
      // type: Schema.Types.ObjectId,
      // ref : "User",
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
    image: [
      {
        imageUrl: {
          type: String,
          required: false,
        }
      },
    ],
    comments: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      // type: String,
      required: false,

    },
  },
  {
    collection: "Board",
    timestamps: true,
  }
);

module.exports = boardSchema;