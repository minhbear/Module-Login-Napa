const mongoose = require("mongoose");

const connectDB = function () {
  const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@login-module.fvco3rx.mongodb.net/?retryWrites=true&w=majority`;

  try {
    return mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    if (err) {
      console.error(
        "Failed to connect to mongo on startup - retrying in 5 seconds",
        err
      );
      setTimeout(connectDB, 5000);
    }
  }
};

module.exports = {
  connectDB
};
