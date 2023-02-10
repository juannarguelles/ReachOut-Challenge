const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connect_db = async () => {
  /* MLAB */
  const mongoDB = process.env.MONGODB_URL;
  const options = {
    keepAlive: true,
    keepAliveInitialDelay: 300000,
    connectTimeoutMS: 30000,
    autoIndex: false,
    socketTimeoutMS: 30000,
  };

  if (process.env.MONGODB_USER) {
    options.user = process.env.MONGODB_USER;
    options.pass = process.env.MONGODB_PASSWORD;
  }

  if (process.env.MONGODB_AUTHDB) {
    options.authSource = process.env.MONGODB_AUTHDB;
  }

  try {
    await mongoose
      .connect(mongoDB, options)
      .then(() => console.log("Connected successful !"));
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on("error", (err) => console.error(err));
  } catch (error) {
    console.log("Connect failed: " + err);
  }
  /* MLAB */
};

module.exports = connect_db;
