#!/usr/bin/env node
require("dotenv").config({ path: `${__dirname}/.env` });
const compression = require("compression");
const express = require("express");
const route = require("./src/routes/route");
const connectDb = require("./src/config/db.config");
const { incomingRequestLogger } = require("./src/middleware/morgan");

const app = express();
const PORT = process.env.PORT || 3010;

// Connect to database
connectDb();

/* REST CONFIG */
app.set("view engine", "ejs");
app.set("trust proxy", true);
app.use(
  express.urlencoded({
    extended: false,
    parameterLimit: 100000,
    limit: "100mb",
  })
);
app.use(
  express.json({ extended: false, parameterLimit: 100000, limit: "100mb" })
);
app.use(compression());
app.use(incomingRequestLogger);
/* REST CONFIG */

/* ROUTES */
app.use("/", route);
/* ROUTES */

app.listen(PORT, () =>
  console.info(
    `ReachOut Exercise listening on port ${PORT} and environment ${process.env.NODE_ENV}! - Worker ${process.pid}`
  )
);
