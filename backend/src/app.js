const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const connectToDB = require("./config/database");
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const attendanceRouter = require("./routes/attendanceRouter");
const leaveRouter = require("./routes/leaveRouter");
const uploadRouter = require("./routes/uploadRouter");
const salaryRouter = require("./routes/salaryRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const cors = require("cors");
const locationRouter = require("./routes/LocationRouter");

const PORT = process.env.PORT || 5000;
// const FRONTEND_URL = "http://localhost:5173";
const FRONTEND_URL = "https://siinfratechems.netlify.app";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.options("*", cors());  // Allows preflight requests


connectToDB()
  .then(() => {
    console.log("Connection to DB established successfully…");
    app.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Connection to DB failed");
  });

app.use("/api", authRouter);
app.use("/api", profileRouter);
app.use("/api", attendanceRouter);
app.use("/api", leaveRouter);
app.use("/api", uploadRouter);
app.use("/api", salaryRouter);
app.use("/api", locationRouter);
