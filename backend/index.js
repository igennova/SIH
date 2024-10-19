const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/useRoutes");
const dataRoutes = require('./routes/dataRoutes');
const eventroutes=require("./routes/eventRoutes");
const videoroutes=require("./routes/videoRoutes")
const teacherroutes=require("./routes/teacherRoutes")
const paymentroute=require("./controller/paymentController")
// const folderroutes=require("./routes/folderRoutes");
const app = express();
// require("dotenv").config();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());


app.use(express.urlencoded({ extended: true }));
// Routes

mongoose.connect("mongodb://localhost:27017", {})
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
  app.use("/api/auth", eventroutes);
  app.use("/api/auth", videoroutes)
  app.use("/api/auth",teacherroutes)
  // app.use("/api/auth",paymentroute)
  app.post("/api/auth/order", async (req, res) => {
    try {
      const razorpay = new Razorpay({
        key_id:"rzp_test_v9oiMGmiqaQcAN",
        key_secret:"Cdde7saK2U5A4R2sJbPhySbh",
      });
  
      const options = req.body;
      const order = await razorpay.orders.create(options);
  
      if (!order) {
        return res.status(500).send("Error");
      }
  
      res.json(order);
    } catch (err) {
      console.log(err);
      res.status(500).send("Error");
    }
  });
  
  app.post("/api/auth/order/validate", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", "Cdde7saK2U5A4R2sJbPhySbh");
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  });
  // app.use("/api/auth", dataRoutes);//api/auth/data
  // app.use('/api/auth', folderroutes);