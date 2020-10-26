const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    dateBegin: { type: Date },
    dateEnd: { type: Date },
    duration: { type: Number },
    shuffle: { type: Boolean },
    gradingMethod: { type: String },
    public: { type: Boolean },
    course: { type: Schema.Types.ObjectId, ref: 'Course' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Exam', ExamSchema);
