const fs = require("fs");
const path = require("path");

const cors = require('cors');

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

const fcRoutes = require("./routes/fc-routes");
const adminRoutes = require("./routes/admin-routes");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use('/uploads/videos', express.static(path.join("uploads", "videos")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/khukurifc", fcRoutes);

app.use("/api/admin", adminRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khukurifc.gilge4o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  // `mongodb+srv://khukurifcmalta:${process.env.DB_PASSWORD}@khukurifc.gilge4o.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
    // app.listen(5000);
    // app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
  
  // `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@khukurifc.q0wtonq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  // `mongodb+srv://khukurifcmalta:Khukurifc@123@khukurifc.q0wtonq.mongodb.net/khukurifc?retryWrites=true&w=majority`