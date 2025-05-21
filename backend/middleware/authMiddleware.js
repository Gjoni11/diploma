const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Nuk ke akses. Token mungon." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // mund ta përdorim më vonë në req.user.id
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token i pavlefshëm." });
  }
};

module.exports = auth;
