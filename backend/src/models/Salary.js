const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
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
    basicSalary: {
      type: Number,
      required: true,
    },
    allowances: {
      type: Number,
      default: 0,
    },
    bonus: {
      type: Number,
      default: 0,
    },
    deduction: {
      type: Number,
      default: 0,
    },
    grossSalary: {
      type: Number,
      required: true,
    },
    netSalary: {
      type: Number,
      required: true,
    },
    payrollMonth: {
      type: String,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    // paymentStatus: {
    //   type: String,
    //   enum: {
    //     values: ["pending", "paid", "failed"],
    //     message: (props) => `${props.value} is not a valid payment status`,
    //   },
    //   default: "pending",
    // },
    paymentMode: {
      type: String,
      enum: {
        values: ["bank transfer", "cash", "cheque"],
        message: (props) => `${props.value} is not a valid payment mode`,
      },
      required: true,
    },
    remarks: {
      type: String,
      maxLength: 200,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);

module.exports = Salary;
