  const db = require("../db");
  var data = db.get("data").value();
  var bcrypt = require('bcrypt')
  var dataUser = db.get("users").value();

  module.exports.viewUser = (req, res) => {
    res.render("user_view", { users: dataUser });
  };

  module.exports.addUser =  (req, res) => {
    res.render("user_add");
  };

  module.exports.postAddUser = (req, res) => {
    const saltRounds = 10;
    //bam pass
    console.log(res.locals);
    bcrypt.hash(res.locals.password, saltRounds).then((hash) =>{
    // Store hash in your password DB.
       db.get("users")
        .push({ id: dataUser.length + 1,
        name: res.locals.name,
        age: res.locals.age,
        sex: res.locals.gioiTinh,
        email: res.locals.email,
        isAdmin: false,
        password: hash,
        wrongLoginCount: 0,
        avatar: res.locals.avatar }).write();
    });

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
    let password = req.body.password;
    req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    let avatar = req.body.avatar;
    const saltRounds = 10;
     bcrypt.hash( password, saltRounds).then((hash) =>{
      db.get("users")
        .find({ id: id })
        .assign({ name: name,
         age: age,
         sex: gioiTinh,
         password: hash,
         avatarUrl: avatar })
        .write();
     });
    
    res.clearCookie("userId");
    res.redirect("/login");
  };