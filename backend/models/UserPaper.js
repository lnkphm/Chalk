const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPaperSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    quizPaper: { type: Schema.Types.ObjectId, ref: 'QuizPaper' },
    submit: { type: Boolean },
    timeRemaining: { type: Number },
    papers: [{
      id: {type: Schema.Types.ObjectId, ref: 'QuizPaper'},
      questions: [{
        id: {type: Schema.Types.ObjectId, ref: 'Question'},
        answers: [{type: String}]
      }]
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserPaper', UserPaperSchema);
