const express = require("express");
const cors = require("cors");
require("dotenv").config();
const ConnectDB = require("./utils/ConnectDB");
const route = require("./routes/Route");

const app = express();

// middleware
// ADD THIS
app.use(cors({origin: true, credentials: true}));
app.use(express.json());

// init route
app.use("/wulloye/api/v1", route);

// listening
app.listen(process.env.PORT, () => {
  // db connection
  ConnectDB();
  console.log("wulloye App running...");
});
