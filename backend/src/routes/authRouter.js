const express = require("express");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Employee = require("../models/Employee");
const userAuth = require("../middlewares/auth");
const Otp = require("../models/Otp");
const { sendOTP, sendRegistrationMsg } = require("../utils/emailServices");
const validateSignupInput = require("../utils/validateSignupInput");
const { handleErrors } = require("../utils/helper");
const adminMiddleware = require("../middlewares/adminMiddleware");

const authRouter = express.Router();

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

authRouter.post("/signup", userAuth, adminMiddleware, async (req, res) => {
  try {
    const { errors, isValid } = validateSignupInput(req.body);

    if (!isValid) {
      return res.status(400).json({ message: errors });
    }

    const {
      firstName,
      lastName,
      phone,
      email,
      dateOfJoining,
      role,
      designation,
      reference,
      employeeId,
      basicSalary,
      totalLeavesAllowed,
      bankName,
      bankAccountNo,
      bankIFSCCode,
    } = req.body;

    const existingEmployee = await Employee.findOne({
      "general.employeeId": employeeId,
      $or: [{ "general.email": email }, { "general.phone": phone }],
    });

    if (existingEmployee) {
      return res.status(409).json({
        message:
          "Email or phone number already in use or there's an employee with the same employee ID already. Please use different credentials.",
      });
    }

    const employee = new Employee({
      general: {
        employeeId,
        firstName,
        lastName,
        phone,
        email,
        dateOfJoining,
        role,
        designation,
        reference,
        isVerified: false,
        basicSalary,
        totalLeavesAllowed,
        role: "employee",
      },
      bankDetails: {
        name: bankName,
        accountNo: bankAccountNo,
        IFSCCode: bankIFSCCode,
      },
    });

    const data = await employee.save();

    res.status(201).json({ message: "Employee added successfully", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.post("/register", async (req, res) => {
  try {
    const { email, employeeId } = req.body;
    if (!email || !employeeId) {
      return res.status(400).json({ message: "Enter both fields" });
    }

    const employee = await Employee.findOne({
      "general.email": email,
      "general.employeeId": employeeId,
      "general.isVerified": false,
    });

    if (!employee) {
      return res.status(400).json({ message: "Invalid employee id or email" });
    }

    const otp = generateOtp();
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 3 * 60 * 1000),
    });

    await sendOTP(email, otp);

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await Employee.findOneAndUpdate(
      { "general.email": email },
      { "general.isVerified": true }
    );

    await Otp.deleteMany({ email });

    res.status(200).json({
      message: "OTP verified. Now you'll be redirected to set your password",
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.post("/set-password", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const hasAlreadyRegistered = await Employee.findOne({
      "general.email": email,
    });

    if (
      hasAlreadyRegistered &&
      !Boolean(hasAlreadyRegistered.general.isVerified)
    ) {
      return res.status(403).json({
        message:
          "You need to first register yourself with us first to set password",
      });
    }
    if (hasAlreadyRegistered && hasAlreadyRegistered.general.password) {
      return res
        .status(403)
        .json({ message: "You're already registered with us" });
    }
    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        message:
          "Enter a strong password. One with atleast 1 capital letter, 1 symbol, 1 number and is 8 characters long",
      });
    }
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password and confirm password do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Employee.findOneAndUpdate(
      { "general.email": email },
      { "general.password": hashedPassword }
    );

    await sendRegistrationMsg(email);

    res
      .status(200)
      .json({ message: "Password set successfully. You can now log in." });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { employeeId, email, password } = req.body;
    if ((!employeeId && !email) || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const employee = await Employee.findOne({
      $or: [{ "general.employeeId": employeeId }, { "general.email": email }],
      "general.isVerified": true,
    });

    if (!employee) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      employee.general.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const jwtToken = jwt.sign(
      { employeeId: employee.general.employeeId },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      maxAge: 86400000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      // sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      sameSite: "None",
      path: "/",
    });

    res.status(200).json({ message: "Login successful", data: employee });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev, true in production
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // lax in dev
      // sameSite: "None",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    handleErrors(err, res);
  }
});

authRouter.patch(
  "/deactivate-user",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { employeeId } = req.body;
      const employee = await Employee.findOne({
        "general.employeeId": employeeId,
        "general.isVerified": true,
      });
      if (!employee)
        return res.status(404).json({ message: "employee not found" });

      employee.general.isVerified = false;
      employee.general.employeeId = "DEL-" + employee.general.employeeId;
      await employee.save({ validateModifiedOnly: true });
      res.status(200).json({ message: "User inactivated" });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

authRouter.post("/reset-password", userAuth, async (req, res) => {
  try {
    const { password } = req.user.general;
    const { oldPassword, password: newPassword, confirmPassword } = req.body;

    const isPasswordCorrect = await bcrypt.compare(oldPassword, password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "old password doesn't match with the existing password",
      });
    }

    const isOldAndNewPasswordSame = await bcrypt.compare(newPassword, password);

    if (isOldAndNewPasswordSame) {
      return res
        .status(401)
        .json({ message: "old and new password can't be same" });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({ message: "Enter a strong password" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "password does not match with confirm password" });
    }

    req.user.general.password = newPassword;

    await req.user.save();
    res.status(200).json({ message: "Password reset done successfully" });
  } catch (err) {
    handleErrors(err, res);
  }
});

module.exports = authRouter;
