module.exports.postAddUser = (req, res, next) => {
    var errors = [];
    let name = req.body.name;
    let age = req.body.age;
    let gioiTinh = req.body.GioiTinh;
    let email = req.body.email;
    let password= req.body.password;
    if(!req.file){
      req.body.avatar = "/uploads/c52cc23d5fccc451b1c3c9d74b53b568";  
    }
    if(req.file){
      req.body.avatar = req.file.path.split("\\").slice(1).join('/'); 
    }
    let avatar= req.body.avatar;
    if (name.length > 30) {
        errors.push("Tên phải ít hơn 30 kí tự");
        res.render("user_add", { errors: errors });
        return;
    }
    res.locals.name = name;
    res.locals.age = age;
    res.locals.gioiTinh = gioiTinh;
    res.locals.password = password;
    res.locals.email = email;
    res.locals.avatar = avatar;
    next();


}