const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema(
  {
    //general info
    general: {
      employeeId: {
        type: String,
        unique: true,
        required: true,
        uppercase: true,
      },
      firstName: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        maxLength: 30,
        trim: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
          if (!validator.isMobilePhone(value, "en-IN"))
            throw new Error("Enter a valid phone number");
        },
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value))
            throw new Error("Enter a valid email address");
        },
      },
      password: {
        type: String,
        // required: true,
        validate: {
          validator(value) {
            return validator.isStrongPassword(value);
          },
          message:
            "Enter a strong password.It must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one symbol.",
        },
      },
      role: {
        type: String,
        lowercase: true,
        enum: {
          values: ["admin", "employee"],
          message: (props) => `${props.value} is not a valid role`,
        },
        default: "employee",
      },
      dateOfJoining: {
        type: Date,
        required: true,
      },
      dateOfLeaving: {
        type: Date,
        validate: {
          validator: function (value) {
            return (
              !value || new Date(this.general.dateOfJoining) < new Date(value)
            );
          },
          message: "Date of leaving cannot be on or before date of joining",
        },
      },
      reference: {
        type: String,
        maxLength: 50,
        trim: true,
      },
      reasonForLeaving: {
        type: String,
        maxLength: 50,
        trim: true,
      },
      designation: {
        type: String,
        maxLength: 50,
        trim: true,
        required: true,
      },
      photoUrl: {
        type: String,
        default:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      basicSalary: {
        type: Number,
        required: true,
      },
      totalLeavesAllowed: {
        type: Number,
        default: 12,
      }
    },
    //personal info
    personal: {
      dateOfBirth: {
        type: Date,
        // required: true,
      },
      bloodGroup: {
        type: String,
        // required: true,
        uppercase: true,
        enum: {
          values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
          message: (props) => `${props.value} is not a valid blood group`,
        },
      },
      maritalStatus: {
        type: String,
        lowercase: true,
        enum: {
          values: ["married", "unmarried"],
          message: (props) => `${props.value} is not a valid marital status`,
        },
      },
      gender: {
        type: String,
        // required: true,
        lowercase: true,
        enum: {
          values: ["male", "female", "other"],
          message: (props) => `${props.value} is not a valid gender`,
        },
      },
      aadharNo: {
        type: Number,
        // required: true,
        validate: {
          validator(v) {
            return v.toString().length === 12;
          },
          message: "aadhar no should be of length 12",
        },
      },
      panNo: {
        type: String,
        maxLength: 10,
        trim: true,
        uppercase: true,
      },
    },
    //contact info
    contact: {
      presentAddress: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 300,
      },
      presentCity: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50,
      },
      presentPinCode: {
        type: Number,
        // required: true,
        validate: {
          validator: function (v) {
            return v.toString().length === 6;
          },
          message: "Pin code must be 6 digits",
        },
      },
      presentState: {
        type: String,
        // required: true,
        enum: {
          values: [
            // States
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",

            // Union Territories
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi",
            "Jammu and Kashmir",
            "Ladakh",
            "Lakshadweep",
            "Puducherry",
          ],
          message: (props) => `${props.value} is not a valid state`,
        },
      },
      sameAsPresent: {
        type: Boolean,
        default: false,
      },
      permanentAddress: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 300,
      },
      permanentCity: {
        type: String,
        // required: true,
        trim: true,
        maxLength: 50,
      },
      permanentPinCode: {
        type: Number,
        // required: true,
        validate: {
          validator: function (v) {
            return v.toString().length === 6;
          },
          message: "Pin code must be 6 digits",
        },
      },
      permanentState: {
        type: String,
        // required: true,
        enum: {
          values: [
            // States
            "Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttar Pradesh",
            "Uttarakhand",
            "West Bengal",

            // Union Territories
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi",
            "Jammu and Kashmir",
            "Ladakh",
            "Lakshadweep",
            "Puducherry",
          ],
          message: (props) => `${props.value} is not a valid state`,
        },
      },
      emergencyContact: {
        type: String,
        // required: true,
        validate(value) {
          if (!validator.isMobilePhone(value, "en-IN"))
            throw new Error("Enter a valid phone number");
        },
      },
    },
    //attachment tab
    attachments: [
      {
        documentType: {
          type: String,
          // required: true,
          enum: {
            values: [
              "company letters",
              "id proofs",
              "education certificates",
              "other",
            ],
            message: (props) => `${props.value} is not a valid document type`,
          },
        },
        attachmentUrl: {
          type: String,
          // required: true,
        },
        description: {
          type: String,
          maxLength: 100,
          trim: true,
        },
        publicId: {
          type: String,
        },
        fileName: {
          type: String,
          // required: true,
        },
      },
    ],
    //bank details
    bankDetails: {
      name: {
        type: String,
      },
      accountNo: {
        type: String,
      },
      IFSCCode: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

//The pre middleware in Mongoose is a function that is executed before a certain event occurs, such as saving a document to the database.
employeeSchema.pre("save", async function (next) {
  if (this.isModified("general.password") && this.general?.password) {
    this.general.password = await bcrypt.hash(this.general.password, 10);
  }
  next();
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
