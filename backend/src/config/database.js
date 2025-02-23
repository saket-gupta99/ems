const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  } catch (err) {
    console.error("Error connecting to DB: " + err.message);
    process.exit(1);
  }
};

module.exports = connectToDB;
