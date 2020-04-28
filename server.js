require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.sessionKey));
const db = require("./db");
const userRoute = require("./route/user_route");
const bookRoute = require("./route/book_route");
const transactionRoute = require('./route/transaction_route');
const loginRoute = require("./route/login_route");
const profileRoute = require("./route/profile_route");
//
const auth_middleware = require("./middleware/auth_middleware");
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'))
app.use("/login", loginRoute);
app.use("/users", auth_middleware.checkCookie, userRoute);
app.use("/", auth_middleware.checkCookie, bookRoute);
app.use("/books", auth_middleware.checkCookie, bookRoute);
app.use("/transaction", auth_middleware.checkCookie, transactionRoute);
app.use("/profile", auth_middleware.checkCookie, profileRoute);
app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.redirect("/login");
});
app.listen(3000, () => {
    console.log("OK!!!");
});

