const mongoose = require("mongoose");
require("dotenv").config();

const databaseInitialization = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      dbName: "myDbCollection",
    });
    if (connection) {
      console.log("Default established connection.");
    }
  } catch (error) {
    console.log("Default connection failed.");
  }
};
module.exports = { databaseInitialization };
