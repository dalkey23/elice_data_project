const { mongoose, Schema } = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    writer: {
      // type: Schema.Types.ObjectId,
      // ref : "User",
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    }
  },
  {
    collection: "Comment",
    timestamps: true,
  }
);

module.exports = commentSchema;