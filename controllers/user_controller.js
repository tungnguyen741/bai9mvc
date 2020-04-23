const db = require("../db");
var data = db.get("data").value();

var dataUser = db.get("users").value();

module.exports.viewUser = (req, res) => {
  res.render("user_view", { users: dataUser });
};

module.exports.addUser =  (req, res) => {
  res.render("user_add");
};

module.exports.postAddUser = (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let gioiTinh = req.body.GioiTinh;
  db.get("users")
    .push({ id: dataUser.length + 1, name: name, age: age, sex: gioiTinh })
    .write();
  res.redirect("/users");
};

module.exports.deleteUser = (req, res) => {
  let id = parseInt(req.params.id);
  db.get("users")
    .remove({ id: id })
    .write();
  res.redirect("/users");
};

module.exports.detailUser = (req, res) => {
  let id = parseInt(req.params.id);
  let dataFinded = db
    .get("users")
    .find({ id: id })
    .value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render("user_detail", { dataDetail: dataArr });
};

module.exports.updateUser = (req, res) => {
  let id = parseInt(req.params.id);
  let dataFinded = db
    .get("users")
    .find({ id: id })
    .value();
  var dataArr = [];
  dataArr.push(dataFinded);
  res.render("user_update", { dataDetail: dataArr });
};

module.exports.postUpdateUser = (req, res) => {
  let id = parseInt(req.params.id);
  let name = req.body.name;
  let age = req.body.age;
  let gioiTinh = req.body.GioiTinh;
  db.get("users")
    .find({ id: id })
    .assign({ name: name, age: age, sex: gioiTinh })
    .write();
  res.redirect("/users");
};