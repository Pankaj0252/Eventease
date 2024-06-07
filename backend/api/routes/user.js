const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("../../middleware/jwtAssign");
const User = require("../../models/user");
const { default: mongoose } = require("mongoose");

router.post("/register", async (req, res, next) => {
  console.log(req.body);

  try {
    const existingUser = await User.findOne({ email: req.body.email }).exec();

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const result = await user.save();
    return res
      .status(201)
      .json({ message: "User Registered", userId: result._id });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res.status(500).json({ error: error.message });
  }
});

router.post("/signIn", (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user !== null && user.validPassword(req.body.password)) {
        let token = jwt.generateJWT({
          email: req.body.email,
          phone: req.body.phone,
        }); // Generate the token, so that user can be validate on later process
        res.cookie("token", token);
        res.status(201).json({ message: "logged in" });
      } else res.status(400).json({ message: "User or Password incorrect" });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
