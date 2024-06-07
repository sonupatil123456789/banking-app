// Start Server

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyparse = require("body-parser");
const cores = require("cors");
const loginRoute = require("./routes/routes");
const envm = require('dotenv/config')

const port = 3000;
const loginPath = "/api/v1/auth";

async function initialise() {
  try {
    mongoose
      .connect("mongodb://localhost:27017/bank", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((value) => {
        console.log(`${value.connection}  database connection successfully`);
      })
      .catch((error) => {
        console.log(error);
      });

    const corsOptions = {
      exposedHeaders: ["auth-token"],
    };
    app.use(cores(corsOptions));
    app.use(bodyparse.json());
    app.use(bodyparse.urlencoded({ extended: true }));

    app.use(loginPath, loginRoute);

    app.get("/", (req, res) => {
      res.json({ Title: "Hello world " });
    });

    app.listen(port, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

initialise();
