const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const UserSchema = new Schema(
  {
    googleId: { type: String },
    username: { type: String },
    email: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    hash: { type: String },
    salt: { type: String },
    role: { type: Schema.Types.ObjectId, ref: "Role" },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

UserSchema.virtual("url").get(function () {
  return "/api/user/" + this._id;
});

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 100000, 64, "sha512")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
