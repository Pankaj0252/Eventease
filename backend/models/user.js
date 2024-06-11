const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.hash(user.password, 12, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.updatedAt = Date.now();
      next();
    });
  } else {
    user.updatedAt = Date.now();
    next();
  }
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
