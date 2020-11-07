const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Tag", TagSchema);
