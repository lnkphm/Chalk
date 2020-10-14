const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizPaperSchema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    shuffle: { type: Boolean },
    method: { type: String },
    duration: { type: Number },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
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

module.exports = mongoose.model('QuizPaper', QuizPaperSchema);
