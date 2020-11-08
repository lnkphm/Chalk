const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    dateOpen: { type: Date },
    dateClose: { type: Date },
    duration: { type: Number },
    shuffle: { type: Boolean },
    gradingMethod: { type: String },
    public: { type: Boolean },
    password: { type: String },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exam', ExamSchema);
