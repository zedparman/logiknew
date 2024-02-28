import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  questions: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
