const mongoose = require('mongoose');
var colors = require('colors');

const connectDB = async () => {
  try {
    // Replace with your actual connection string
    const conn = await mongoose.connect(process.env.MONGOSE_URI);
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`.bgBlue.white);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Stop the app if connection fails
  }
};

module.exports = connectDB;
