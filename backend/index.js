const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/useRoutes");
const app = express();
// require("dotenv").config();

mongoose.connect("mongodb+srv://y0utuberlucky001:sihwinner2024@cluster0.0utzf.mongodb.net/", {})
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB ERROR", err.message);
  });