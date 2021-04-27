const jwt = require("jsonwebtoken");
module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwr.verify(token, process.env.SECRET);
      if (decoded.role !== role) {
        res.status(403).json({ message: "No admin rights" });
      }
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};
