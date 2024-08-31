const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];

  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication1",
        status: "ERROR",
      });
    }
    if (user.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "the authentication5",
        status: "ERROR",
      });
    }
  });
};
const authUserMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, "access_token", function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "the authentication12",
        status: "ERROR",
      });
    }
    console.log("user", user);
    if (user.isAdmin || user.id) {
      next();
    } else {
      return res.status(404).json({
        message: "the authentication55",
        status: "ERROR",
      });
    }
  });
};
module.exports = {
  authMiddleware,
  authUserMiddleware,
};
