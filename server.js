const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const db = require("./db");
const userRoute = require("./route/user_route");
const bookRoute = require("./route/book_route");
const transactionRoute = require('./route/transaction_route')
//
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/users", userRoute);
app.use("/books", bookRoute);
app.use('/transaction', transactionRoute);
https: app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
