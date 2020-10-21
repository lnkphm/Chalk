const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema(
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
    category: { type: Schema.Types.ObjectId, ref: 'QuizCategory' },
    questions: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'Question' },
        points: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quiz', QuizSchema);
