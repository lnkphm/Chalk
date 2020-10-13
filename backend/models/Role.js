const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  name: { type: String, require: true },
  description: { type: String },
});

RoleSchema.virtual('url').get(function () {
  return '/api/role/' + this._id;
});

module.exports = mongoose.model('Role', RoleSchema);
