const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.isAdmin) {
        next();
      } else {
        res.status(401).json({ status: false, msg: "Yor are not a Admin" });
      }
    });
  } else {
    res.status(4000).json({ status: false, msg: "error while authorization" });
  }
};

module.exports = { authorization };
