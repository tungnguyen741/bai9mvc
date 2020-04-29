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
    req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    let avatar = req.body.avatar;
    const saltRounds = 10;

	cloudinary.v2.uploader.upload("./public/"+avatar)
	.then( (error, result) => {
		console.log(result, error)
	})
	.then( ()=>{
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
	})
 

   



}