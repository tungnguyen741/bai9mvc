var bcrypt = require('bcrypt')
var User = require('../Models/user.model');
module.exports.indexProfile = (req, res, next) =>{
  let isUserAd = User.findOne({_id: req.signedCookies.userId });
  let dataFinded = User.findOne({_id: isUserAd.id });
  console.log(dataFinded);

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
            .find({ id: isUserAd.id })
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
            .find({ id: isUserAd.id })
            .assign({ name: name,
             age: age,
             sex: gioiTinh,
             password: hash,
             avatarUrl: avatar  })
            .write();
      })
   })


  

 


}	