const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const jwt = require("../../middleware/jwtAssign");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

router.post("/register", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length > 0) {
        res.status(200).json({
          message: "Email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 12, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: req.body.password,
            });
            user
              .save()
              .then(() =>
                res.status(201).json({
                  message: "User Registered",
                })
              )
              .catch((err) =>
                res.status(500).json({
                  error: err,
                })
              );
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/Login", async (req, res, next) => {
  console.log("TTTTTT");
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log(user);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.status(201).json({ message: "Logged in successfully", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
