const mongoose = require("mongoose");
require("dotenv").config();

// a db connector function
const ConnectDB = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        console.log("Wulloye DB Connected...");
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = ConnectDB;
