const db = require("../db");
var data = db.get("data").value();

module.exports.showBook = (req, res) => {
  var isUserAd = db.get("users").find({ id: parseInt(req.signedCookies.userId) }).value();
  var page = parseInt(req.query.page) || 1; //so trang
  var items = 8; // 8 item
  var start = (page-1)*items;
  var end = page*items;
  var endPage = Math.floor(data.length / items+1);
  if(isUserAd.isAdmin){
    res.render("books", { books: data.slice(start, end),
      viewAction: true,
      user: isUserAd,
      page: page,
      endPage: endPage,
      });
  }
  res.render("books",{ books: data.slice(start, end),
      viewAction: false,
      user: isUserAd,
      page: page,
      endPage,
     });
  
};

module.exports.showAdd = (req, res) => {
  res.render("add");
};

module.exports.postAddBook = (req, res) => {
  let titleAdded = req.body.titleAdded;
  let descriptionAdded = req.body.descriptionAdded;
  db.get("data")
    .push({
      id: data.length + 1,
      title: titleAdded,
      description: descriptionAdded
    })
    .write();
  res.redirect("/books");
};

module.exports.deleteBook = (req, res) => {
  let id = parseInt(req.params.id);
  db.get("data")
    .remove({ id: id })
    .write();
  db.get("transaction")
    .remove({ bookId: id })
    .write();
  res.redirect("/books");
};

module.exports.viewDetail = (req, res) => {
  let id = parseInt(req.params.id);
  let dataFinded = db
    .get("data")
    .find({ id: id })
    .value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render("detail", { dataDetail: dataArr });
};

module.exports.updateBook = (req, res) => {
  let id = parseInt(req.params.id);
  let dataFinded = db
    .get("data")
    .find({ id: id })
    .value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render("update", { dataDetail: dataArr });
};

module.exports.postUpdateBook = (req, res) => {
  let id = parseInt(req.params.id);
  let titleUpdate = req.body.titleUpdate;
  let descriptionUpdate = req.body.descriptionUpdate;
  db.get("data")
    .find({ id: id })
    .assign({ title: titleUpdate, description: descriptionUpdate })
    .write();
  res.redirect("/books");
};
