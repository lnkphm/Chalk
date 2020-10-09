const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExamSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    timeStart: { type: Date },
    timeEnd: { type: Date },
    examPaper: [{ type: Schema.Types.ObjectId, ref: "ExamPaper" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", ExamSchema);
