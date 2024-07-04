var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'event-manager', 'attendee'],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
