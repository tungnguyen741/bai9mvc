const db = require("../db");
var data = db.get("data").value();
var bcrypt = require('bcrypt')
var dataUser = db.get("users").value();


module.exports.indexProfile = (req, res, next) =>{
  var isUserAd = db.get("users").find({ id: parseInt(req.signedCookies.userId) }).value();
  let dataFinded = db
      .get("users")
      .find({ id: isUserAd.id })
      .value();
    var dataArr = [];
    dataArr.push(dataFinded);
    res.render("profile", { dataDetail: dataArr });
  
}
module.exports.postProfile = (req, res, next)=>{
	var cloudinary = require('cloudinary');
	cloudinary.config({ 
		cloud_name: process.env.CloudName, 
		api_key: process.env.APIkeyUp, 
		api_secret: process.env.APIsecretUp 
	});
 	var isUserAd = db.get("users").find({ id: parseInt(req.signedCookies.userId) }).value();
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let password = req.body.password;
    //req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    //req.body.avatar = req.file.path.split("\\").slice(1,2).join()+ "/" +req.file.originalname;
    req.body.avatar = req.file.path.split("\\").slice(0,2).join("/")+ "/" +req.file.originalname;
    let avatar = req.body.avatar;
    const saltRounds = 10;

     bcrypt.hash( password, saltRounds).then((hash) =>{
      db.get("users")
        .find({ id: isUserAd.id })
        .assign({ name: name,
         age: age,
         sex: gioiTinh,
         password: hash,
         avatarUrl: avatar })
        .write();
     });
  

     cloudinary.uploader.upload("./"+avatar)
    .then((result) => {
      response.status(200).send({
        message: "success",
        result,
      });
    }).catch((error) => {
      response.status(500).send({
        message: "failure",
        error,
      });
    });
}