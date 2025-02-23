const mongoose = require("mongoose");
const { toIST } = require("../utils/helper");

const leaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    employeeId: {
      type: String,
      ref: "Employee",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "approved", "rejected"],
        message: (props) => `${props.value} is not a valid status`,
      },
      default: "pending",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          const today = toIST();
          today.setUTCHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Start date cannot be in the past",
      },
    },
    endDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          return value >= this.startDate;
        },
        message: "End date must be after or equal to the start date.",
      },
    },
    leaveType: {
      type: String,
      required: true,
      maxLength: 100,
      trim: true,
      enum: {
        values: [
          "sick leave",
          "casual leave",
          "maternity leave",
          "earned leave",
        ],
        message: (props) => `${props.value} is not a valid leave type`,
      },
    },
    duration: {
      type: Number,
    },
    reasonForLeave: {
      type: String,
      required: true,
      trim: true,
      minLength: 10,
      maxLength: 300,
    },
    approvedDate: {
      type: Date,
      validate: {
        validator(value) {
          if (this.status === "approved" && !value) {
            return false;
          }
          return true;
        },
        message: "Approved date is required when the leave is approved",
      },
    },
  },
  { timestamps: true }
);


const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
