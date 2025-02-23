const mongoose = require("mongoose");
const { toIST } = require("../utils/helper");

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      validate: {
        validator: async function (value) {
          const today = toIST();
          today.setUTCHours(0, 0, 0, 0);

          const existingAttendance = await mongoose
            .model("Attendance")
            .findOne({
              employee: value,
              date: {
                $gte: today,
                $lt: today.setUTCHours(23, 59, 59, 999),
              },
            });

          return !existingAttendance;
        },
        message: "Attendance already exists for this employee today",
      },
    },
    employeeId: {
      type: String,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          const inputDate = toIST(value);
          const today = toIST();
          today.setUTCHours(0, 0, 0, 0);
          inputDate.setUTCHours(0, 0, 0, 0);
          return inputDate.getTime() === today.getTime();
        },
        message: "Attendance can only be taken for the present day",
      },
    },
    attendance: {
      type: String,
      required: true,
      enum: {
        values: ["present", "absent", "leave"],
        message: (props) => `${props.value} is not a valid attendance status`,
      },
    },
    checkIn: {
      type: Date,
      required: true,
      validate: {
        validator(value) {
          const today = toIST();
          today.setUTCHours(0, 0, 0, 0);
          return value > today;
        },
        message: "Check-in must be for today",
      },
    },
    checkOut: {
      type: Date,
      // validate: {
      //   validator: function (value) {
      //     console.log(value, this.checkIn);
      //     return new Date(value) > new Date(this.checkIn);
      //   },
      //   message: "check-out must be after check-in",
      // },
      default: null,
    },
  },
  { timestamps: true }
);

//for update this.checkIn doesn't give value from db. the commented validation above only works when saving/creating docuement. for updating use 'pre' middleware
attendanceSchema.pre("findOneAndUpdate", async function (next) {
  //The getUpdate() method fetches the fields being updated (e.g., { checkOut: someValue } in the update query).
  const update = this.getUpdate();

  // If checkOut is being updated
  if (update.checkOut) {
    //The this.getQuery() method retrieves the query filter used in the findOneAndUpdate call
    const attendance = await this.model.findOne(this.getQuery());
    if (!attendance) {
      return next(new Error("Attendance record not found"));
    }

    if (!attendance.checkIn) {
      return next(new Error("checkIn is not set, cannot validate checkOut"));
    }

    if (new Date(update.checkOut) <= new Date(attendance.checkIn)) {
      return next(new Error("checkOut must be after checkIn"));
    }
  }

  next();
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
