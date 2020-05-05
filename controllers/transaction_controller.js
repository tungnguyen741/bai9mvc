var User = require('../Models/user.model');
var Book = require('../Models/data.model');
var Transaction = require('../Models/transaction.model');
var Session = require('../Models/session.model');
module.exports.indexTransaction = async function(req, res) {
    let books = await Book.find();
    let users = await User.find();
    let transactions = await Transaction.find();
    let session = await Session.findOne({
        _id: req.signedCookies.sessionId
    });
    let bookName = [];
    let amountBook = [];
    let statusBook = [];
    let usersBorrow = [];
    let ssArrFind = session.cart;
    //GUESS
    if (!res.locals.user) {
        console.log('GUESSSSSSSSSSSSSSSSSSSSs');
        ssArrFind.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item.bookId;
            });
            bookName.push(bookNameFind);
            amountBook.push(item.quantity);
        });
        res.render('transaction', {
            bookNameBorrow: bookName.flat(),
            sumItem: amountBook,
            statusBook: ssArrFind
        });
    }
    //ADMIN
    if (res.locals.user.isAdmin) {
        console.log('ADMINNNNNNNNNNNNNNN');
        transactions.forEach(item => {
            bookName.push(item.bookId);
            statusBook.push(item.isComplete);
            usersBorrow.push(item.userId);
        });
        var temp = [];
        bookName.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item;
            });
            temp.push(bookNameFind);
        });
        var temp2 = [];
        usersBorrow.forEach(item => {
            var usersBorrow1 = users.filter(item2 => {
                return item2.id == item;
            });
            temp2.push(usersBorrow1);
        });
        res.render('transaction', {
            usersBorrow: temp2.flat(),
            statusBook,
            bookNameBorrow: temp.flat(),
            sumItem: false
        });
        return;
    }
    //USER
    if (res.locals.user) {
        usersBorrow = users.filter(item => {
            return res.locals.user.id == item.id;
        });
        ssArrFind.forEach(item => {
            var bookNameFind = books.filter(item2 => {
                return item2.id == item.bookId;
            });
            bookName.push(bookNameFind);
            amountBook.push(item.quantity);
        });
        res.render('transaction', {
            usersBorrow,
            bookNameBorrow: bookName.flat(),
            sumItem: amountBook,
            statusBook: ssArrFind
        });
    }
};
module.exports.createTransaction = (req, res) => {
    res.render("transaction_create", {
        dataUser: dataUser,
        dataBook: dataBook
    });
};
module.exports.postCreateTransaction = (req, res) => {
    var bookRecieve = req.body.bookRecieve;
    var userRecieve = req.body.userRecieve;
    var idBookRecieve = db.get("data").find({
        title: bookRecieve
    }).value().id;
    var idUserRecieve = db.get("users").find({
        name: userRecieve
    }).value().id;
    db.get("transaction").push({
        tranId: "tr" + dataTran.length,
        userId: idUserRecieve,
        bookId: idBookRecieve,
        isComplete: false
    }).write();
    res.redirect("/transaction");
};
module.exports.finishTransaction = (req, res) => {
    // /transaction/"+ num +"/complete
    var errors = [];
    var tranIdparam = req.params.tranId;
    var resultId = db.get('transaction').find({
        tranId: tranIdparam
    }).value();
    if (!resultId) {
        errors.push("id " + tranIdparam + " Not Found");
    }
    if (errors.length) {
        res.render('transaction', {
            errors: errors
        });
        return;
    }
    db.get('transaction').find({
        tranId: tranIdparam
    }).assign({
        isComplete: true
    }).write();
    res.redirect('/transaction');
};