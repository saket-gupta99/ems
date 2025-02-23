const express = require("express");

const userAuth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { handleErrors, toIST } = require("../utils/helper");
const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const { sendApproveLeaveMsg } = require("../utils/emailServices");

const leaveRouter = express.Router();

leaveRouter.get("/leaves/:employeeId", userAuth, async (req, res) => {
  try {
    const employeeId = req.params.employeeId;
    if (!employeeId)
      return res.status(400).json({ message: "provide an employee Id" });

    const data = await Leave.find({ employeeId });

    return res
      .status(200)
      .json({ message: "leaves fetched successfully", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

leaveRouter.get("/leaves", userAuth, adminMiddleware, async (req, res) => {
  try {
    const data = await Leave.find({})
      .populate(
        "employee",
        "general.firstName general.lastName general.photoUrl"
      )
      .lean();

    data.forEach((el) => {
      if (el.employee.general) {
        el.firstName = el.employee.general.firstName;
        el.lastName = el.employee.general.lastName;
        el.photoUrl = el.employee.general.photoUrl;
        delete el.employee;
      }
    });

    res.status(200).json({ message: "leaves data fetched successfully", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

leaveRouter.post("/leave/apply", userAuth, async (req, res) => {
  try {
    const { employeeId } = req.user.general;
    const { startDate, endDate, reasonForLeave, leaveType } = req.body;
    if (!startDate)
      return res.status(400).json({ message: "start date is required" });
    if (!endDate)
      return res.status(400).json({ message: "end date is required" });
    if (!leaveType)
      return res.status(400).json({ message: "leave type is required" });
    if (!reasonForLeave)
      return res.status(400).json({ message: "reason for leave is required" });

    const employee = await Employee.findOne({
      "general.employeeId": employeeId,
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const remainingLeaves = employee.general.totalLeavesAllowed;
    const difference =
      Math.floor(
        (toIST(endDate) - toIST(startDate)) / (24 * 60 * 60 * 1000)
      ) + 1;

    if (leaveType.toLowerCase() === "earned leave" && remainingLeaves <= 0) {
      return res.status(403).json({
        message:
          "You've already exhausted your earned leaves quota. Apply again with another appropriate leave type",
      });
    }

    const today = toIST();
    today.setUTCHours(0, 0, 0, 0);

    if (toIST(startDate) < today) {
      return res.status(400).json({
        message: "start date should be after today's date i.e " + today,
      });
    }
    if (toIST(endDate) < toIST(startDate)) {
      return res
        .status(400)
        .json({ message: "end date should be after start date" });
    }
    if (
      ![
        "sick leave",
        "casual leave",
        "maternity leave",
        "earned leave",
      ].includes(String(leaveType).toLowerCase())
    ) {
      return res.status(400).json({ message: "Invalid leave type" });
    }

    const existingLeave = await Leave.findOne({
      employeeId,
      startDate: { $lte: toIST(endDate) },
      endDate: { $gte: toIST(startDate) },
    });

    if (existingLeave) {
      return res
        .status(400)
        .json({ message: "Leave period overlaps with an existing leave" });
    }

    const leave = new Leave({
      employee: employee._id,
      employeeId,
      startDate: toIST(startDate).setUTCHours(0, 0, 0, 0),
      endDate: toIST(endDate).setUTCHours(23, 59, 59, 999),
      reasonForLeave,
      duration: difference,
      leaveType: leaveType.toLowerCase(),
    });

    const data = await leave.save();

    res.status(201).json({ message: "leave applied successfully", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

leaveRouter.patch(
  "/leave/review",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const { action, employeeId, startDate, endDate, leaveType } = req.body;

      if (!employeeId) {
        return res.status(400).json({ message: "employee id is required" });
      }
      if (!["approved", "rejected"].includes(action.toLowerCase())) {
        return res.status(400).json({ message: "Invalid action" });
      }
      if (!startDate) {
        return res.status(400).json({ message: "start date is required" });
      }
      if (!endDate) {
        return res.status(400).json({ message: "end date is required" });
      }

      const leaveExists = await Leave.findOneAndUpdate(
        {
          employeeId,
          startDate,
          endDate,
        },
        { $set: { status: action } }, //will only update status and validations will run
        { runValidators: true, new: true }
      );

      if (!leaveExists) {
        return res.status(404).json({ message: "Leave Record not found!" });
      }

      const employee = await Employee.findOne({
        "general.employeeId": employeeId,
      });
      const difference =
        Math.floor(
          (new Date(endDate) - new Date(startDate)) / (24 * 60 * 60 * 1000)
        ) + 1;
      if (leaveType === "earned leave" && action === "approved") {
        employee.general.totalLeavesAllowed -= difference;
      }
      await employee.save();

      sendApproveLeaveMsg(employee.general.email, startDate, endDate);

      res.status(200).json({ message: "reviewed", data: leaveExists });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

module.exports = leaveRouter;
