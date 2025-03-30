const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successful");
  } catch (err) {
    console.log("Connection unsuccessful");
    process.exit(0);
  }
};

module.exports = connectDB;
