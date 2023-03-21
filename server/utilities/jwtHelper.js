const jwt = require("jsonwebtoken");

exports.signJWT = (payload) => jwt.sign(payload, process.env.SECRET_KEY);

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.verifyJWT = (req, res, next) => {
  let token = req.headers["authorization"];

  const payload = jwt.verify(token, process.env.SECRET_KEY);
  if (payload) {
    req.userId = payload.sub;
    return next();
  }
  res.status(401).json({
    message: "Unauthorized!",
  });
};
