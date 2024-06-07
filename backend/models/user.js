const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre("save", function (next) {
  const user = this;
  // Only hash the password if it has been modified or is new
  if (!user.isModified("password")) return next();

  // Generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    // Hash the password along with the salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // Override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// Method to compare passwords
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
