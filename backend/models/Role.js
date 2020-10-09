const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PermissionType = require("./enums/PermissionType");

const RoleSchema = new Schema(
  {
    name: { type: String, require: true },
    description: { type: String },
    permissions: [{ type: String, enum: PermissionType}],
  },
  {
    timestamps: true,
  }
);

RoleSchema.virtual('url').get(function() {
  return '/api/role/' + this._id;
})

RoleSchema.methods.addPermission = function(permission) {
  this.permissions.push(permission);
}

module.exports = mongoose.model("Role", RoleSchema);