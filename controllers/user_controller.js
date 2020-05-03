var User = require('../Models/user.model');
var bcrypt = require('bcrypt')

var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CloudName,
    api_key: process.env.APIkeyUp,
    api_secret: process.env.APIsecretUp
});

module.exports.viewUser = async function (req, res) {
  var users = await User.find();
    res.render("user_view", {
        users
    });
};
module.exports.addUser = (req, res) => {
    res.render("user_add");
};
module.exports.postAddUser = async function (req, res) {

 
    const saltRounds = 10;
    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
    }
    if (req.file) {
        req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    }
    try{
      var uploader = await cloudinary.v2.uploader.upload("./public/" + req.body.avatar);
    }
    catch(err){
     console.log(err); 
    }
    var hashPass = await bcrypt.hash(res.locals.password, saltRounds);
    var updateUs = await new User ({ 
          name:  req.body.name ,
          age: req.body.age,
          sex: req.body.GioiTinh,
          password: hashPass,
          avatarUrl: req.body.avatar,
          isAdmin: false,
          wrongLoginCount: 0,
    }).save();
    res.redirect('/'); 


};
module.exports.deleteUser = async function (req, res) {
    let id = req.params.id;
    await User.deleteOne({_id: id});
    res.redirect('/users');
};
module.exports.detailUser = async function (req, res) {
    let id = req.params.id;
    let dataHaveAvatar = [];
    let dataFinded = await User.find({_id: id});
    dataFinded.forEach(item => {
      if(item.avatarUrl.includes('https')){
        dataHaveAvatar.push(item.avatarUrl);
      }
    });
    res.render("user_detail", {
        dataFinded,
        dataHaveAvatar: dataHaveAvatar.length>0
    });
};
module.exports.updateUser = async function (req, res) { 
    let id = req.params.id;
    let dataHaveAvatar = [];
    let dataFinded = await User.find({_id: id});
    dataFinded.forEach(item => {
      if(item.avatarUrl.includes('https')){
        dataHaveAvatar.push(item.avatarUrl);
      }
    });
    res.render("user_update", {
        dataFinded,
        dataHaveAvatar: dataHaveAvatar.length>0
    });
};
module.exports.postUpdateUser = async function (req, res) {
    let id = req.params.id;
    const saltRounds = 10;
    if (!req.file) {
        req.body.avatar = "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
    }
    if (req.file) {
        req.body.avatar = req.file.path.split("\\").slice(1).join('/');
    }
    try{
      var uploader = await cloudinary.v2.uploader.upload("./public/" + req.body.avatar);
    }
    catch(err){
     console.log(err); 
    }
    var hashPass = await bcrypt.hash(req.body.password, saltRounds);
    var updateUs = await User.updateOne({_id: id}, { 
          name:  req.body.name,
          age: req.body.age,
          sex: req.body.GioiTinh,
          password: hashPass,
          avatarUrl: req.body.avatar
    });
    res.redirect('/'); 
};