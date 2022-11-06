const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const AuthRouters = require("./routes/auth");
const ForgotPassRouter = require("./routes/forgotPass");
const ResetPassRouter = require("./routes/resetPass");
const AccountsRouter = require("./routes/accounts");

const app = express();

const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@login-module.fvco3rx.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connect to database");
    app.listen(process.env.PORT);
    console.log("Listen in port " + process.env.PORT);
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use("/auth", AuthRouters);

// /forgot-password
app.use("/forgot-password", ForgotPassRouter);

// /reset-password/:id/:token
app.use("/reset-password", ResetPassRouter);

// /accounts
app.use('/accounts', AccountsRouter);