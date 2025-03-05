const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
      },
    ],
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          const today = new Date();
          today.setUTCHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Start date should be today",
      },
    },
    endDate: {
      type: Date,
      validate: {
        validator(value) {
          return !value || value > this.startDate;
        },
        message: "end date cannot be before start date",
      },
    },
    locationName: {
      type: String,
      required: true,
      trim: true,
    },
    latitude: {
      type: Number,
      required: true,
      trim: true,
    },
    longitude: {
      type: Number,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

locationSchema.pre("save", function (next) {
  const employeeIds = this.employees.map((el) => el.toString());
  const uniqueIds = new Set(employeeIds);

  if (employeeIds.length !== uniqueIds.size) {
    return next(new Error("Duplicate employeeId found in employees array"));
  }

  next();
});

const Location = new mongoose.model("Location", locationSchema);

module.exports = Location;
