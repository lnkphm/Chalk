const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String },
  description: { type: String },
  course: { type: Schema.Types.ObjectId, ref: 'Course'}
});

module.exports = mongoose.model("Tag", TagSchema);
