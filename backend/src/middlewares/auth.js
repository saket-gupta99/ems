const jwt = require("jsonwebtoken");
require("dotenv").config();

const Employee = require("../models/Employee");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { employeeId } = decoded;
    if (!employeeId) {
      return res
        .status(400)
        .json({ message: "Invalid token. User not found!" });
    }

    const user = await Employee.findOne({ "general.employeeId": employeeId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    req.user = user;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token has expired. Please login again" });
    }
    return res.status(400).json({ message: "Invalid token. " + err.message });
  }
};

module.exports = userAuth;
