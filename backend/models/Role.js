const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
});

module.exports = mongoose.model('Role', RoleSchema);
