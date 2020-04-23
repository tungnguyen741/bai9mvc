const db = require("../db");
var dataTran = db.get("transaction").value();
var dataUser = db.get("users").value();
var dataBook = db.get("data").value();

module.exports.indexTransaction = (req, res) => {
  var usersBorrow = [];
  var booksBorrow = [];
  var amountBook = [];
  var statusBook = [];
  dataTran.forEach(item => {
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
    amountBook.push( item.tranId );
    statusBook.push(item.isComplete);
  });
   
  res.render("transaction", {
    usersBorrow: usersBorrow,
    booksBorrow: booksBorrow,
    amountBook: amountBook,
    statusBook: statusBook
  });
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
      id: "tr" + dataTran.length + 1,
      userId: idUserRecieve,
      bookId: idBookRecieve,
      isComplete: false
    })
    .write();
  res.redirect("/transaction");
};

module.exports.finishTransaction = (req, res)=>{
  // /transaction/"+ num +"/complete
  var tranIdparam = req.params.tranId;
  db.get('transaction')
  .find({ tranId: tranIdparam })
  .assign({ isComplete: true })
  .write();
  res.redirect('/transaction');
};