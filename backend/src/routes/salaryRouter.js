const express = require("express");
const userAuth = require("../middlewares/auth");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { handleErrors } = require("../utils/helper");
const Employee = require("../models/Employee");
const Attendance = require("../models/Attendance");
const Salary = require("../models/Salary");
const { salarySlipHandler } = require("../utils/generateSalarySlip");
const Leave = require("../models/Leave");

const salaryRouter = express.Router();

salaryRouter.post(
  "/add-salary",
  userAuth,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        employeeId,
        allowances,
        bonus,
        payrollMonth,
        paymentMode,
        remarks,
      } = req.body;

      if (!employeeId)
        return res.status(400).json({ message: "employee id is required" });
      if (!payrollMonth)
        return res.status(400).json({ message: "payroll month is required" });
      if (!paymentMode)
        return res.status(400).json({ message: "payment mode is required" });

      const existingSalaryData = await Salary.findOne({
        payrollMonth,
        employeeId,
      });
      if (existingSalaryData)
        return res
          .status(400)
          .json({ message: "salary data for this month already exists" });

      const employee = await Employee.findOne({
        "general.employeeId": employeeId,
      });
      if (!employee)
        return res.status(404).json({ message: "employee not found" });

      const [month, year] = payrollMonth.split("-").map(Number);

      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0); //0 refers to the last day of the previous month.
      endDate.setHours(0, 0, 0, 0);
      const employeeAttendance = await Attendance.find({
        employeeId,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      });

      //test this later
      const extraLeavesTakenFromEarnedLeave =
        employee.general.totalLeavesAllowed < 0
          ? Math.abs(employee.general.totalLeavesAllowed)
          : 0;

      const isOnPaidLeave = await Leave.find({
        employeeId,
        $or: [
          {
            startDate: { $lte: new Date(year, month, 0) },
            endDate: { $gte: new Date(year, month - 1, 1) },
          },
        ],
        leaveType: "earned leave",
      });

      const paidLeave = isOnPaidLeave.reduce(
        (acc, curr) => acc + curr.duration,
        0
      );

      let sundayCount = 0;
      for (
        let i = startDate.getTime();
        i <= endDate.getTime();
        i += 24 * 60 * 60 * 1000
      ) {
        if (new Date(i).getDay() === 0) sundayCount++;
      }

      const totalDays = new Date(year, month, 0).getDate();
      const presentDays = employeeAttendance.length + paidLeave + sundayCount;
      const absentDays = totalDays - presentDays;

      const dailySalary = employee.general.basicSalary / totalDays;
      const deduction =
        (absentDays + extraLeavesTakenFromEarnedLeave) * dailySalary;
      const grossSalary =
        employee.general.basicSalary +
        Number(allowances || 0) +
        Number(bonus || 0);
      const netSalary = grossSalary - deduction;

      if (employee.general.totalLeavesAllowed < 0) {
        employee.general.totalLeavesAllowed = 0;
        await employee.save();
      }

      const salaryData = new Salary({
        employee: employee._id,
        employeeId,
        basicSalary: employee.general.basicSalary,
        allowances,
        bonus,
        deduction,
        grossSalary,
        netSalary,
        payrollMonth,
        paymentDate: new Date(),
        paymentMode,
        remarks,
      });

      await salaryData.save();

      res.status(201).json({ message: "salary data added" });
    } catch (err) {
      handleErrors(err, res);
    }
  }
);

salaryRouter.get("/salary", userAuth, adminMiddleware, async (req, res) => {
  try {
    const data = await Salary.find();

    res.status(200).json({ message: "salary data fetched successfully", data });
  } catch (err) {
    handleErrors(err, res);
  }
});

salaryRouter.post("/salary-slip", userAuth, salarySlipHandler);

module.exports = salaryRouter;
