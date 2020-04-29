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
    var cloudinary = require('cloudinary');
      cloudinary.config({ 
      cloud_name: process.env.CloudName, 
      api_key: process.env.APIkeyUp, 
      api_secret: process.env.APIsecretUp 
    });
    const saltRounds = 10;
    cloudinary.v2.uploader.upload("./public/"+res.locals.avatar)
     .then((result, err)=>{
        console.log(result);
     })
     .then(()=>{
        bcrypt.hash( res.locals.password, saltRounds).then((hash) =>{
            db.get("users")
              .push({ id: dataUser.length + 1,
              name: res.locals.name,
              age: res.locals.age,
              sex: res.locals.gioiTinh,
              email: res.locals.email,
              isAdmin: false,
              password: hash,
              wrongLoginCount: 0,
              avatarUrl: res.locals.avatar }).write();
        })
     })
    .catch(()=>{
        bcrypt.hash( res.locals.password, saltRounds).then((hash) =>{
           db.get("users")
              .push({ id: dataUser.length + 1,
              name: res.locals.name,
              age: res.locals.age,
              sex: res.locals.gioiTinh,
              email: res.locals.email,
              isAdmin: false,
              password: hash,
              wrongLoginCount: 0,
              avatarUrl: res.locals.avatar }).write();
        })
     })
     .then(res.redirect('/'));

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
    var cloudinary = require('cloudinary');
  cloudinary.config({ 
    cloud_name: process.env.CloudName, 
    api_key: process.env.APIkeyUp, 
    api_secret: process.env.APIsecretUp 
  });

   
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let password = req.body.password;
    if(!req.file){
      req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
    }
    if(req.file){
      req.body.avatar = req.file.path.split("\\").slice(1).join('/'); 
    }
    
   let avatar = req.body.avatar;
   
    const saltRounds = 10;

  cloudinary.v2.uploader.upload("./public/"+avatar)
     .then((result, err)=>{
        console.log(result);
     })
     .then(()=>{
        bcrypt.hash( password, saltRounds).then((hash) =>{
            db.get("users")
              .find({ id })
              .assign({ name: name,
               age: age,
               sex: gioiTinh,
               password: hash,
               avatarUrl: avatar  })
              .write();
        })
     })
    .catch(()=>{
        bcrypt.hash( password, saltRounds).then((hash) =>{
            db.get("users")
              .find({ id })
              .assign({ name: name,
               age: age,
               sex: gioiTinh,
               password: hash,
               avatarUrl: avatar  })
              .write();
        })
     })
     .then(res.redirect('/'));




  };