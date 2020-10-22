const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionTypes = require('./enums/QuestionTypes');

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String, required: true, enum: QuestionTypes },
    quiz: { type: Schema.Types.ObjectId, ref: 'Quiz' },
    shuffle: { type: Boolean, default: true },
    feedback: { type: String },
    answers: [
      {
        id: { type: Number },
        text: { type: String },
        points: { type: Number },
      },
    ],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
