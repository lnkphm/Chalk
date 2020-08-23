const mongoose = require("mongoose");
const crypto = require("crypto");

const UserSchema = mongoose.Schema(
  {
    googleId: String,
    username: String,
    email: String,
    password: String,
    image: String,
    displayName: String,
    firstName: String,
    lastName: String,
    hash: String,
    salt: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 256, "sha256")
    .toString("hex");
};

UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 256, "sha256")
    .toString("hex");
  return this.hash === hash;
};

module.exports = mongoose.model("User", UserSchema);
