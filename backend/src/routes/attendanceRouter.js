const express = require("express");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");
const Location = require("../models/Location");
const userAuth = require("../middlewares/auth");
const Employee = require("../models/Employee");
const { handleErrors, haversineDistance, toIST } = require("../utils/helper");

const attendanceRouter = express.Router();

attendanceRouter.get("/attendance", userAuth, async (req, res) => {
  try {
    const data = await Attendance.find({})
      .populate("employee", "general.firstName general.lastName")
      .lean(); // Converts Mongoose objects to plain JSON

    data.forEach((attendance) => {
      if (attendance.employee.general) {
        attendance.firstName = attendance.employee.general.firstName;
        attendance.lastName = attendance.employee.general.lastName;
        delete attendance.employee;
      }
    });
    res.status(200).json({ data });
  } catch (err) {
    handleErrors(err, res);
  }
});

attendanceRouter.post("/attendance/checkin", userAuth, async (req, res) => {
  try {
    const { employeeId } = req.user.general;
    const { date, latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location is required" });
    }

    const employee = await Employee.findOne({
      "general.employeeId": employeeId,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const existsInLocation = await Location.findOne({
      employees: { $in: [employee._id] },
      isActive: true,
    });

    if (!existsInLocation)
      return res
        .status(400)
        .json({ message: "You are not assigned to any location" });

    const officeLat = existsInLocation.latitude;
    const officeLon = existsInLocation.longitude;

    const distance = haversineDistance(
      officeLat,
      officeLon,
      latitude,
      longitude
    );

    if (distance > 100) {
      return res
        .status(403)
        .json({ message: "You are outside the allowed check-in radius" });
    }

    if (!date)
      return res.status(400).json({ message: "Enter date for " + employeeId });

    const inputDate = toIST(date);
    const today = toIST();
    today.setUTCHours(0, 0, 0, 0);
    inputDate.setUTCHours(0, 0, 0, 0);
    if (inputDate.getTime() !== today.getTime()) {
      return res
        .status(400)
        .json({ message: "Enter today's date for " + employeeId });
    }

    const existingAttendance = await Attendance.findOne({
      employee: employee._id,
      date: {
        $gte: toIST().setUTCHours(0, 0, 0, 0),
        $lt: toIST().setUTCHours(23, 59, 59, 999),
      },
    });

    if (existingAttendance) {
      return res.status(400).json({
        message:
          "Attendance already exists for this employee today: " + employeeId,
      });
    }

    const isOnLeave = await Leave.findOne({
      employeeId,
      startDate: { $lte: toIST().setUTCHours(23, 59, 59, 999) },
      endDate: { $gte: toIST().setUTCHours(0, 0, 0, 0) },
      status: "approved",
    });

    if (isOnLeave) {
      return res.status(400).json({
        message: "You're on approved leave. you can't check-in on leave days",
      });
    }

    const attendanceInstance = new Attendance({
      employee: employee._id,
      employeeId,
      date: toIST(date),
      attendance: "present",
      checkIn: toIST(),
      location: existsInLocation._id,
      locationName: existsInLocation.locationName,
    });

    const data = await attendanceInstance.save();

    res.status(201).json({ message: "Check-in done", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

attendanceRouter.patch("/attendance/checkout", userAuth, async (req, res) => {
  try {
    const { employeeId } = req.user.general;
    const { latitude, longitude } = req.body;

    const employee = await Employee.findOne({
      "general.employeeId": employeeId,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const existsInLocation = await Location.findOne({
      employees: { $in: [employee._id] },
      isActive: true,
    });

    if (!existsInLocation)
      return res
        .status(400)
        .json({ message: "You are not assigned to any location" });

    const officeLat = existsInLocation.latitude;
    const officeLon = existsInLocation.longitude;

    if (!employeeId) {
      return res.status(400).json({ message: "Employee Id is required" });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({ message: "Location is required" });
    }

    const distance = haversineDistance(
      officeLat,
      officeLon,
      latitude,
      longitude
    );

    if (distance > 100) {
      return res
        .status(403)
        .json({ message: "You are outside the allowed check-out radius" });
    }

    const today = toIST();
    today.setUTCHours(0, 0, 0, 0);
    const tomorrow = toIST(today);
    tomorrow.setDate(today.getDate() + 1);

    const updatedAttendance = await Attendance.findOneAndUpdate(
      {
        employeeId,
        date: {
          $gte: today,
          $lt: tomorrow,
        },
        checkOut: null,
      },
      { checkOut: toIST() },
      { new: true, runValidators: true }
    );

    if (!updatedAttendance) {
      return res.status(404).json({
        message: "No active check-in record found for today",
      });
    }

    res.status(200).json({
      message: "Check-out done",
      data: updatedAttendance,
    });
  } catch (err) {
    handleErrors(err, res);
  }
});

module.exports = attendanceRouter;
