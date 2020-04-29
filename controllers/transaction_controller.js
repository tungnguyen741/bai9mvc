const db = require("../db");
var dataTran = db.get("transaction").value();
var dataUser = db.get("users").value();
var dataBook = db.get("data").value();

module.exports.indexTransaction = (req, res) => {
    var usersBorrow = [];
    var booksBorrow = [];
    var amountBook = [];
    var statusBook = [];

    var isUserAd = db.get("users").find({
        id: parseInt(req.signedCookies.userId)
    }).value();
    if (isUserAd.isAdmin) {
        dataTran.forEach(item => {
            usersBorrow.push(db.get("users").find({
                id: item.userId
            }).value().name);
            booksBorrow.push(db.get("data").find({
                id: item.bookId
            }).value().title);
            amountBook.push(item.tranId);
            statusBook.push(item.isComplete);
        });
        res.render("transaction", {
            usersBorrow: usersBorrow,
            booksBorrow: booksBorrow,
            amountBook: amountBook,
            statusBook: statusBook,
            saveMore: true
        });
    };

    var cookId = req.signedCookies.userId;
    var isUserOfCook = dataTran.filter(item=>{
        return item.userId == parseInt(cookId);
    });
    isUserOfCook.forEach(item => {
         usersBorrow.push(
            db
            .get("users")
            .find({ id: item.userId })
            .value().name
        );
        booksBorrow.push(
            db
            .get("data")
            .find({ id: item.bookId })
            .value().title
        );
        amountBook.push(item.tranId);
        statusBook.push(item.isComplete);
    });

    res.render("transaction", {
        usersBorrow: usersBorrow,
        booksBorrow: booksBorrow,
        amountBook: false,
        statusBook: statusBook,
        saveMore: false
    })
};

module.exports.createTransaction = (req, res) => {
    res.render("transaction_create", { dataUser: dataUser, dataBook: dataBook });
};

module.exports.postCreateTransaction = (req, res) => {
    var bookRecieve = req.body.bookRecieve;
    var userRecieve = req.body.userRecieve;
    var idBookRecieve = db
        .get("data")
        .find({ title: bookRecieve })
        .value().id;
    var idUserRecieve = db
        .get("users")
        .find({ name: userRecieve })
        .value().id;
    db.get("transaction")
        .push({
            tranId: "tr" +  dataTran.length,
            userId: idUserRecieve,
            bookId: idBookRecieve,
            isComplete: false
        })
        .write();
    res.redirect("/transaction");
};

module.exports.finishTransaction = (req, res) => {
    // /transaction/"+ num +"/complete
    var errors = [];
    var tranIdparam = req.params.tranId;
    var resultId = db.get('transaction').find({ tranId: tranIdparam }).value();

    if (!resultId) {
        errors.push("id " + tranIdparam + " Not Found");
    }

    if (errors.length) {
        res.render('transaction', { errors: errors });
        return;
    }

    db.get('transaction')
        .find({ tranId: tranIdparam })
        .assign({ isComplete: true })
        .write();
    res.redirect('/transaction');
};