// db.js: To link mongo db to application
const mongoose = require("mongoose");

// Use async because all mongoose methods are asyncronous
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // cyan: From express colors package
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    // Exit the process with failure (1 means failure)
    process.exit(1);
  }
};

module.exports = connectDB;
