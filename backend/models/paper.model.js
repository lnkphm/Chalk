const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaperSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    exam: { type: Schema.Types.ObjectId, ref: 'Exam' },
    submitted: { type: Boolean },
    connected: { type: Boolean },
    timeRemaining: { type: Number },
    questions: [{
      id: { type: Schema.Types.ObjectId, ref: 'Question' },
      answer: { type: String }
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserPaper', PaperSchema);
