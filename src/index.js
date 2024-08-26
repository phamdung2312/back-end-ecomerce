const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
dotenv.config();
const mongoose = require("mongoose");
const app = express();
const route = require("./routes");
const port = process.env.PORT || 3001;
app.use(cookieParser());

// cho phép client truy cập từ domain k phải là 3001
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
route(app);
mongoose
  .connect(
    "mongodb+srv://dungp7674:1oP0ireBgCWdeRtT@cluster0.j9e0ozv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("connect Db success");
  })
  .catch((err) => console.error(err));
console.log("process", process.env.CLIENTID);
app.listen(port, () => {
  console.log("running with port", port);
});
