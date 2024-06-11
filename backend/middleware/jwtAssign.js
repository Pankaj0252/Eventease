require("dotenv").config();
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key";

module.exports = {
  generateJWT: (details) => {
    return jwt.sign(details, SECRET_KEY, { expiresIn: "1h" });
  },
  verifyJWT: (token) => {
    try {
      jwt.verify(token, SECRET_KEY);
      return true;
    } catch (err) {
      return false;
    }
  },
  getDecodedValue: (token) => {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch (err) {
      return null;
    }
  },
};
