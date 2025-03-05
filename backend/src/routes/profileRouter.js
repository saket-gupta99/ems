const express = require("express");

const userAuth = require("../middlewares/auth");
const { handleErrors } = require("../utils/helper");
const validatePersonalInput = require("../utils/validatePersonalInput");
const validateContactInput = require("../utils/validateContactInput");
const adminMiddleware = require("../middlewares/adminMiddleware");
const Employee = require("../models/Employee");

const profileRouter = express.Router();

profileRouter.get(
  "/profile/all",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const data = await Employee.find({});
      res.status(200).json({ data });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const { general: newGeneral, personal, contact, attachments } = req.user;
    const {
      employeeId,
      firstName,
      lastName,
      phone,
      email,
      role,
      dateOfJoining,
      dateOfLeaving,
      reference,
      reasonForLeaving,
      designation,
      photoUrl,
    } = newGeneral;
    const general = {
      employeeId,
      firstName,
      lastName,
      phone,
      email,
      role,
      dateOfJoining,
      dateOfLeaving,
      reference,
      reasonForLeaving,
      designation,
      photoUrl,
    };
    const data = { general, personal, contact, attachments };
    res.status(200).json({ data });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.get("/profile/general", userAuth, async (req, res) => {
  try {
    const {
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      dateOfJoining,
      photoUrl,
      role,
      reference,
      reasonForLeaving,
      designation,
    } = req.user.general;

    res.status(200).json({
      employeeId,
      firstName,
      lastName,
      email,
      phone,
      dateOfJoining,
      photoUrl,
      role,
      reference,
      reasonForLeaving,
      designation,
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.patch(
  "/profile/general",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { employeeId } = req.body;
      
      const employee = await Employee.findOne({
        "general.employeeId": employeeId,
      });

      if (!employee)
        return res.status(404).json({ message: "employee not found" });

      const allowedFields = [
        "dateOfJoining",
        "dateOfLeaving",
        "phone",
        "reference",
        "designation",
        "reasonForLeaving",
        "photoUrl",
        "role",
        "basicSalary",
        "totalLeavesAllowed"
      ];

      const hasAllowedFields = Object.keys(req.body).some((key) =>
        allowedFields.includes(key)
      );

      if (!hasAllowedFields) {
        return res.status(400).json({ message: "No valid fields to update" });
      }

      //set() is used to mark fields as modified explicitly and ensures that Mongoose applies validation when you call .save()
      for (const [key, value] of Object.entries(req.body)) {
        if (allowedFields.includes(key)) {
          employee.set(`general.${key}`, value);
        }
      }

      await employee.save();

      res.status(200).json({
        message: "general fields updated successfully!",
        updatedFields: allowedFields.filter((field) => field in req.body),
      });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

profileRouter.get("/profile/personal", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    res.status(200).json({ data: loggedInUser.personal });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.patch("/profile/personal", userAuth, async (req, res) => {
  try {
    const { errors, isValid } = validatePersonalInput(req.body);

    if (!isValid) {
      return res.status(400).json({ message: errors });
    }

    const loggedInUser = req.user;

    for (const [key, value] of Object.entries(req.body)) {
      loggedInUser.set(`personal.${key}`, value);
    }

    await loggedInUser.save();

    res.status(200).json({
      message: "employee's personal fields updated successfully",
      data: loggedInUser.personal,
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.get("/profile/contact", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    res.status(200).json({ data: loggedInUser.contact });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.patch("/profile/contact", userAuth, async (req, res) => {
  try {
    const { errors, isValid } = validateContactInput(req.body);

    if (!isValid) {
      return res.status(400).json({ message: errors });
    }

    const loggedInUser = req.user;

    for (const [key, value] of Object.entries(req.body)) {
      loggedInUser.set(`contact.${key}`, value);
    }

    await loggedInUser.save();

    res.status(200).json({
      message: "contact fields updated successfully",
      data: loggedInUser.contact,
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

profileRouter.get(
  "/profile/bank-details",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { employeeId } = req.body;
      const data = await Employee.findOne({ "general.employeeId": employeeId });

      return res.status(200).json({ data: data.bankDetails });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

profileRouter.patch(
  "/profile/bank-details",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { employeeId, name, accountNo, IFSCCode } = req.body;

      if (!employeeId) {
        return res.status(400).json({ message: "Employee id is required" });
      }
      if (!name) {
        return res.status(400).json({ message: "bank name is required" });
      }
      if (!accountNo) {
        return res.status(400).json({ message: "bank account no is required" });
      }
      if (!IFSCCode) {
        return res.status(400).json({ message: "bank IFSC code is required" });
      }

      const employee = await Employee.findOne({
        "general.employeeId": employeeId,
      });
      if (!employee) {
        return res.status(404).json({ message: "No employee found" });
      }

      for (const [key, value] of Object.entries(req.body)) {
        employee.set(`bankDetails.${key}`, value);
      }

      await employee.save();

      res.status(200).json({ message: "bank details updated successfully" });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

module.exports = profileRouter;
