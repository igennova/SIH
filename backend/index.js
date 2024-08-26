const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/useRoutes");
const dataRoutes = require('./routes/dataRoutes');
const folderroutes=require("./routes/folderRoutes");
const app = express();
// require("dotenv").config();

app.use(cors());
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// Routes

mongoose.connect("mongodb+srv://y0utuberlucky001:sihwinner2024@cluster0.0utzf.mongodb.net/", {})
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log("DB ERROR", err.message);
  });
  const server = app.listen(5000, () => {
    console.log("Server is running");
  });
  
  app.use("/api/auth", authRoutes);
  app.use("/api/auth", dataRoutes);//api/auth/data
  app.use('/api/auth', folderroutes);