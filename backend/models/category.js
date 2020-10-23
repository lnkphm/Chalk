const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryTypes = require('../enums/CategoryTypes')

const QuestionCategorySchema = new Schema({
  name: { type: String },
  description: { type: String },
  type: { type: String, enum: CategoryTypes },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
});

module.exports = mongoose.model("QuestionCategory", QuestionCategorySchema);
