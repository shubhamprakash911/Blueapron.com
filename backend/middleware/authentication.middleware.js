const jwt = require("jsonwebtoken");
require("dotenv").config();

const authanticate = async (req, res, next) => {
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.status(401).json({
        status: false,
        msg: "error in the token",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, msg: "error while authentication" });
  }
};

module.exports = { authanticate };
