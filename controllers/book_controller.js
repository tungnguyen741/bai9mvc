const db = require("../db");
var data = db.get("data").value();

module.exports.showBook = (req, res) => {
  res.render("books", { books: data });
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
