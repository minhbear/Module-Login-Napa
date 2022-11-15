const express = require("express");
const {connectDB} = require('./middleware/mongoose');
const morgan = require('morgan');

require("dotenv").config();

const AuthRouters = require("./routes/auth");
const ForgotPassRouter = require("./routes/forgotPass");
const ResetPassRouter = require("./routes/resetPass");
const AccountsRouter = require("./routes/accounts");

const app = express();

//don't show the log when it is test
if(process.env.NODE_ENV !== 'test') {
  //use morgan to log at command line
  app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB()
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => {
    console.log(err)
  })


//routes
app.use("/auth", AuthRouters);

// /forgot-password
app.use("/forgot-password", ForgotPassRouter);

// /reset-password/:id/:token
app.use("/reset-password", ResetPassRouter);

// /accounts
app.use('/accounts', AccountsRouter);

//testing
module.exports = {
  app
}