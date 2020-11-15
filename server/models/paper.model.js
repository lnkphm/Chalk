const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaperSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
    submitted: { type: Boolean },
    graded: { type: Boolean },
    timeRemaining: { type: Number },
    data: [
      {
        question: { type: Schema.Types.ObjectId, ref: 'Question' },
        answers: [{ type: String }],
        points: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Paper', PaperSchema);
