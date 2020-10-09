const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserPaperSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    exam: { type: Schema.Types.ObjectId, ref: "Exam" },
    answers: [
      {
        question: { type: Schema.Types.ObjectId, ref: "Question" },
        text: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserPaper", UserPaperSchema);
