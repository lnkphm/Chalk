const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseTagSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("CourseTag", CourseTagSchema);
