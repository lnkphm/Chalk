const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategoryTypes = require('./enums/CategoryTypes')

const CategorySchema = new Schema({
  name: { type: String },
  type: { type: String, enum: CategoryTypes },
  description: { type: String },
});

module.exports = mongoose.model("Category", CategorySchema);
