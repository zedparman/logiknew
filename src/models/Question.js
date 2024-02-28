const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  author: { type: String, required: true },
  title: { type: String, required: true },
  caption: { type: String, required: true },
  endDate: { type: Date },
  options: [{ type: Object }], // از نوع Object و ارایه ای از آن
  comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "Comment",
  },
});

const Question =
  mongoose.models.Question || mongoose.model("Question", questionSchema);

module.exports = Question;
