// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool }   = require('pg');
const dbParams   = require('./lib/db.js');
const db         = new Pool(dbParams);

db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes       = require("./routes/users");
const ordersRoutes      = require("./routes/orders");
const menuRoutes        = require("./routes/menu_items");
const individualItems   = require("./routes/individual_items");
const orderRoutes       = require("./routes/orders");
const registerRoutes    = require("./routes/register");
const orderItemRoutes   = require("./routes/order_items");
const finalItemRoutes   = require("./routes/final_order_items");
const finalOrderRoutes  = require("./routes/final_orders");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/orders", ordersRoutes(db));
app.use("/menu", menuRoutes(db));
app.use("/menuItem", individualItems(db));
app.use("/orders", orderRoutes(db));
app.use("/register", registerRoutes(db));
app.use("/orderItems", orderItemRoutes(db));
app.use("/finalItems", finalItemRoutes(db));
app.use("/finalOrders", finalOrderRoutes(db));

// Note: mount other resources here, using the same pattern above
// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});






