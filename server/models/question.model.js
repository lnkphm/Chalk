const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionTypes = require('./enums/QuestionTypes');

const QuestionSchema = new Schema(
  {
    text: { type: String, required: true },
    type: { type: String, required: true, enum: QuestionTypes },
    shuffle: { type: Boolean, default: true },
    feedback: { type: String },
    answers: [
      {
        id: { type: Number },
        text: { type: String },
        points: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Question', QuestionSchema);
