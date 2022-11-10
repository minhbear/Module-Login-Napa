const express = require("express");
const {connectDB} = require('./middleware/mongoose');
const {configExpress} = require('./middleware/configExpress');

require("dotenv").config();

const AuthRouters = require("./routes/auth");
const ForgotPassRouter = require("./routes/forgotPass");
const ResetPassRouter = require("./routes/resetPass");
const AccountsRouter = require("./routes/accounts");

const app = express();

connectDB()
  .then(() => {
    console.log("Connect to database");
    app.listen(process.env.PORT);
    console.log("Listen in port " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err)
  })

configExpress();
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