const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, required: true },
    shuffle: { type: Boolean, default: true },
    feedback: { type: String },
    case_sensitive: { type: Boolean, default: false },
    answers: [
      {
        id: { type: Number },
        text: { type: String },
        grade: { type: Number },
        description: { type: String },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
