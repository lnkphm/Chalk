const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionTypes = require('./enums/QuestionType');

const QuestionSchema = new Schema(
  {
    type: { type: String, required: true, enum: QuestionTypes },
    text: { type: String, required: true },
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
