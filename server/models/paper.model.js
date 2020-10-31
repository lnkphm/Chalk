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
      data: { type: Schema.Types.ObjectId, ref: 'Question' },
      answers: [{
        id: {type: Number},
        text: {type: String},
        choice: {type: Boolean}
      }]
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Paper', PaperSchema);
