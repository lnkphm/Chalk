const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    timeStart: { type: Date },
    timeEnd: { type: Date },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    quizPaper: [{ type: Schema.Types.ObjectId, ref: 'QuizPaper' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', QuizSchema);
