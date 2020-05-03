require('dotenv').config()
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser(process.env.sessionKey));

// MONGO DB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('CONNECTED Successfully')
});

// ==== ROUTE ====
const userRoute = require("./route/user_route");
const bookRoute = require("./route/book_route");
const transactionRoute = require('./route/transaction_route');
const loginRoute = require("./route/login_route");
const profileRoute = require("./route/profile_route");
const cartRoute = require("./route/cart_route");
const session = require("./middleware/session_middleware");
const auth_middleware = require("./middleware/auth_middleware");
// ==== VIEW ====
app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static('public'));

//==== USE ROUTE ====
app.use(session);
app.use("/login", loginRoute);
app.use("/users", userRoute);
app.use("/", cartRoute, bookRoute);
app.use("/books", cartRoute, bookRoute);
app.use("/transaction", cartRoute, transactionRoute);
app.use("/profile", auth_middleware.checkCookie, profileRoute);
app.use("/cart", cartRoute);
app.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.clearCookie("sessionId");
    res.redirect("/login");
});
app.listen(3000, () => {
    console.log("OK!!!");
});

