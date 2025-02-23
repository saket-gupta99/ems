const adminMiddleware = (req, res, next) => {
  if (req.user.general.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Only admin can make changes!" });
  }
  next();
};

module.exports = adminMiddleware;
